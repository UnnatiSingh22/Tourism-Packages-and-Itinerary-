import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MinioService } from '../../shared/minio.service';
import { SocketGateway } from '../../sockets/socket.gateway';
import { CreateTravelerDto, UpdateTravelerDto } from './dto/traveler.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class TravelersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async listTravelers(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { passportNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.traveler.count({ where }),
      this.prisma.traveler.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        include: { departure: true },
      }),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async createTraveler(tenantId: string, dto: CreateTravelerDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Row Lock on departure to prevent race condition
      const lockedDepartures = await tx.$queryRaw<any[]>`
        SELECT id, "availableCapacity" as available_capacity, "startDate" as start_date
        FROM departures 
        WHERE id = ${dto.departureId} AND "tenantId" = ${tenantId} AND "isDeleted" = false
        FOR UPDATE
      `;
      if (!lockedDepartures || lockedDepartures.length === 0) {
        throw new NotFoundException(`Departure with ID ${dto.departureId} not found`);
      }

      const lockedDep = lockedDepartures[0];
      const availableCapacity = lockedDep.available_capacity;
      const departureStart = new Date(lockedDep.start_date);

      // 2. Traveler compliance check upfront (Passport 6-month rule)
      const passportExpiry = new Date(dto.passportExpiry);
      const limitDate = new Date(departureStart);
      limitDate.setMonth(limitDate.getMonth() + 6);
      const isCompliant = passportExpiry >= limitDate;
      const complianceStatus = isCompliant ? 'clear' : 'blocked';

      // 3. Evaluate capacity to decide booking vs waitlist
      if (availableCapacity > 0) {
        // Book traveler
        const traveler = await tx.traveler.create({
          data: {
            tenantId,
            departureId: dto.departureId,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            passportNumber: dto.passportNumber,
            passportExpiry,
            nationality: dto.nationality.toUpperCase(),
            complianceStatus,
            status: 'BOOKED',
          },
        });

        // Decrement capacity
        await tx.departure.update({
          where: { id: dto.departureId },
          data: { availableCapacity: availableCapacity - 1 },
        });

        // Socket notifications
        this.socketGateway.emitTravelerBooked(traveler.id, { firstName: traveler.firstName });
        this.socketGateway.emitInventoryChanged(dto.departureId, {
          availableCapacity: availableCapacity - 1,
        });

        return traveler;
      } else {
        // Queue to Waitlist
        const traveler = await tx.traveler.create({
          data: {
            tenantId,
            departureId: dto.departureId,
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            passportNumber: dto.passportNumber,
            passportExpiry,
            nationality: dto.nationality.toUpperCase(),
            complianceStatus,
            status: 'PENDING', // PENDING for waitlisted
          },
        });

        // Calculate priority
        const currentWaitlistCount = await tx.departureWaitlist.count({
          where: { departureId: dto.departureId },
        });

        await tx.departureWaitlist.create({
          data: {
            tenantId,
            departureId: dto.departureId,
            travelerId: traveler.id,
            priority: currentWaitlistCount + 1,
            status: 'PENDING',
          },
        });

        this.socketGateway.emitInventoryChanged(dto.departureId, {
          availableCapacity: 0,
        });

        return {
          ...traveler,
          waitlisted: true,
          priority: currentWaitlistCount + 1,
        };
      }
    });
  }

  async getTraveler(tenantId: string, id: string) {
    const traveler = await this.prisma.traveler.findFirst({
      where: { id, tenantId, isDeleted: false },
      include: { departure: true, documents: true },
    });
    if (!traveler) {
      throw new NotFoundException(`Traveler with ID ${id} not found`);
    }
    return traveler;
  }

  async updateTraveler(tenantId: string, id: string, dto: UpdateTravelerDto) {
    await this.getTraveler(tenantId, id);

    const data: any = { ...dto };
    if (dto.passportExpiry) data.passportExpiry = new Date(dto.passportExpiry);

    return this.prisma.traveler.update({
      where: { id },
      data,
    });
  }

  async checkCompliance(tenantId: string, travelerId: string) {
    const traveler = await this.prisma.traveler.findFirst({
      where: { id: travelerId, tenantId, isDeleted: false },
      include: { departure: true },
    });
    if (!traveler) {
      throw new NotFoundException(`Traveler with ID ${travelerId} not found`);
    }

    if (!traveler.departure) {
      throw new BadRequestException('Traveler is not assigned to any departure');
    }

    const passportExpiry = new Date(traveler.passportExpiry);
    const limitDate = new Date(traveler.departure.startDate);
    limitDate.setMonth(limitDate.getMonth() + 6);

    const isCompliant = passportExpiry >= limitDate;
    const complianceStatus = isCompliant ? 'clear' : 'blocked';

    // Update DB
    await this.prisma.traveler.update({
      where: { id: travelerId },
      data: { complianceStatus },
    });

    return {
      travelerId,
      passportExpiry,
      requiredExpiryAfter: limitDate,
      isCompliant,
      complianceStatus,
    };
  }

  // File document upload to MinIO
  async uploadDocument(tenantId: string, travelerId: string, documentType: string, file: Express.Multer.File) {
    await this.getTraveler(tenantId, travelerId);

    const fileUrl = await this.minioService.uploadFile(
      file.originalname,
      file.buffer,
      file.size,
      file.mimetype,
    );

    return this.prisma.travelerDocument.create({
      data: {
        tenantId,
        travelerId,
        fileName: file.originalname,
        fileUrl,
        documentType,
      },
    });
  }

  // Refund Engine + Waitlist promotion
  async cancelBooking(tenantId: string, travelerId: string) {
    return this.prisma.$transaction(async (tx) => {
      const traveler = await tx.traveler.findFirst({
        where: { id: travelerId, tenantId, isDeleted: false },
        include: { departure: true },
      });

      if (!traveler) {
        throw new NotFoundException(`Traveler with ID ${travelerId} not found`);
      }
      if (traveler.status === 'CANCELLED') {
        throw new BadRequestException('Booking is already cancelled');
      }

      if (!traveler.departure) {
        // Simply cancel if no departure
        return tx.traveler.update({
          where: { id: travelerId },
          data: { status: 'CANCELLED' },
        });
      }

      const departureId = traveler.departureId;

      // Lock row
      const lockedDepartures = await tx.$queryRaw<any[]>`
        SELECT id, "availableCapacity" as available_capacity, "startDate" as start_date
        FROM departures 
        WHERE id = ${departureId} AND "tenantId" = ${tenantId}
        FOR UPDATE
      `;
      const lockedDep = lockedDepartures[0];
      let available = lockedDep.available_capacity;

      // 1. Run Refund Engine logic
      // 30+ days: refund minus cancellation fee (90% refund, 10% fee)
      // <30 days: 100% penalty (0 refund)
      const depDate = new Date(lockedDep.start_date);
      const currentDate = new Date();
      const diffMs = depDate.getTime() - currentDate.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      // Fetch package price for refund calculation
      const pkg = await tx.tourPackage.findFirst({
        where: { id: traveler.departure.packageId },
      });
      const baseCost = pkg ? Number(pkg.basePrice) : 0;
      let refundAmount = 0;

      if (diffDays >= 30) {
        refundAmount = baseCost * 0.90; // 9% cancellation fee
      } else {
        refundAmount = 0; // 100% penalty
      }

      // Update traveler status
      const cancelledTraveler = await tx.traveler.update({
        where: { id: travelerId },
        data: {
          status: 'CANCELLED',
          refundAmount,
        },
      });

      // Remove from waitlist if they were waitlisted
      await tx.departureWaitlist.updateMany({
        where: { travelerId, departureId, status: 'PENDING' },
        data: { status: 'CANCELLED' },
      });

      // 2. Waitlist Promotion
      const nextInWaitlist = await tx.departureWaitlist.findFirst({
        where: { departureId, status: 'PENDING' },
        orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
      });

      if (nextInWaitlist) {
        // Promote waitlisted guest
        await tx.departureWaitlist.update({
          where: { id: nextInWaitlist.id },
          data: { status: 'PROMOTED' },
        });

        await tx.traveler.update({
          where: { id: nextInWaitlist.travelerId },
          data: { status: 'BOOKED' },
        });

        // availableCapacity remains unchanged because we promoted someone to fill the slot
      } else {
        // Increment capacity
        available++;
        await tx.departure.update({
          where: { id: departureId },
          data: { availableCapacity: available },
        });
      }

      // Socket broadcasts
      this.socketGateway.emitTravelerCancelled(travelerId, { refundAmount });
      this.socketGateway.emitInventoryChanged(departureId, {
        availableCapacity: available,
      });

      return {
        cancelledTraveler,
        refundCalculated: refundAmount,
        refundDaysBeforeDeparture: diffDays,
        promotedWaitlistTravelerId: nextInWaitlist ? nextInWaitlist.travelerId : null,
      };
    });
  }
}
