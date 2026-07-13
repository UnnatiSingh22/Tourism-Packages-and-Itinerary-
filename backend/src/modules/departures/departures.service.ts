import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SocketGateway } from '../../sockets/socket.gateway';
import { QueueService } from '../../queues/queue.service';
import {
  CreateDepartureDto,
  UpdateDepartureDto,
  UpdateInventoryDto,
} from './dto/departure.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class DeparturesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly queueService: QueueService,
  ) {}

  async listDepartures(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [total, data] = await Promise.all([
      this.prisma.departure.count({ where }),
      this.prisma.departure.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        include: { package: true },
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

  async createDeparture(tenantId: string, dto: CreateDepartureDto) {
    // 1. Package validation: Must exist & be published
    const pkg = await this.prisma.tourPackage.findFirst({
      where: { id: dto.packageId, tenantId, isDeleted: false },
    });
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${dto.packageId} not found`);
    }
    if (pkg.status !== 'PUBLISHED') {
      throw new BadRequestException(`Cannot schedule departure: Package is not published. Current status: ${pkg.status}`);
    }

    // 2. Future date check
    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    if (startDate <= new Date()) {
      throw new BadRequestException('Departure start date must be in the future');
    }
    if (endDate <= startDate) {
      throw new BadRequestException('Departure end date must be after start date');
    }

    const departure = await this.prisma.departure.create({
      data: {
        tenantId,
        packageId: dto.packageId,
        name: dto.name,
        startDate,
        endDate,
        capacity: dto.capacity,
        availableCapacity: dto.capacity,
        status: 'ACTIVE',
      },
    });

    // Queue background cutoff check at departure date
    const delayMs = startDate.getTime() - Date.now();
    if (delayMs > 0) {
      await this.queueService.addJob(
        'departure-cutoff',
        'DepartureCutoffJob',
        { departureId: departure.id, tenantId },
        { delay: delayMs },
      );
    }

    return departure;
  }

  async getDeparture(tenantId: string, id: string) {
    const departure = await this.prisma.departure.findFirst({
      where: { id, tenantId, isDeleted: false },
      include: { package: true },
    });
    if (!departure) {
      throw new NotFoundException(`Departure with ID ${id} not found`);
    }
    return departure;
  }

  async updateDeparture(tenantId: string, id: string, dto: UpdateDepartureDto) {
    const departure = await this.getDeparture(tenantId, id);

    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);

    const updated = await this.prisma.departure.update({
      where: { id },
      data,
    });

    // Notify clients real-time
    this.socketGateway.emitDepartureUpdated(id, { name: updated.name });

    return updated;
  }

  // PostgreSQL Row Locking for inventory capacity updates
  async updateInventory(tenantId: string, id: string, dto: UpdateInventoryDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Lock Row via SELECT FOR UPDATE
      const lockedDepartures = await tx.$queryRaw<any[]>`
        SELECT id, capacity, "availableCapacity" as available_capacity, status 
        FROM departures 
        WHERE id = ${id} AND "tenantId" = ${tenantId} AND "isDeleted" = false 
        FOR UPDATE
      `;

      if (!lockedDepartures || lockedDepartures.length === 0) {
        throw new NotFoundException(`Departure with ID ${id} not found`);
      }

      const lockedDep = lockedDepartures[0];
      const oldCapacity = lockedDep.capacity;
      const oldAvailable = lockedDep.available_capacity;

      const newCapacity = dto.capacity;
      const difference = newCapacity - oldCapacity;
      let newAvailable = oldAvailable + difference;

      if (newAvailable < 0) {
        throw new BadRequestException('Cannot reduce capacity below the number of booked travelers');
      }

      // Update departure record
      const updated = await tx.departure.update({
        where: { id },
        data: {
          capacity: newCapacity,
          availableCapacity: newAvailable,
        },
      });

      // 2. Waitlist Promotion loop if capacity increased
      if (difference > 0) {
        let promotedCount = 0;
        // Fetch pending waitlist records sorted by priority asc, createdAt asc
        const waitlist = await tx.departureWaitlist.findMany({
          where: { departureId: id, status: 'PENDING' },
          orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
        });

        for (const record of waitlist) {
          if (newAvailable <= 0) break;

          // Promote waitlist
          await tx.departureWaitlist.update({
            where: { id: record.id },
            data: { status: 'PROMOTED' },
          });

          // Update traveler status
          await tx.traveler.update({
            where: { id: record.travelerId },
            data: { status: 'BOOKED' },
          });

          newAvailable--;
          promotedCount++;
        }

        if (promotedCount > 0) {
          // Commit finalized capacity adjustments after waitlist check
          await tx.departure.update({
            where: { id },
            data: { availableCapacity: newAvailable },
          });
          updated.availableCapacity = newAvailable;
        }
      }

      // 3. Socket broadcasts
      this.socketGateway.emitInventoryChanged(id, {
        capacity: updated.capacity,
        availableCapacity: updated.availableCapacity,
      });

      return updated;
    });
  }

  async closeDeparture(tenantId: string, id: string) {
    const departure = await this.getDeparture(tenantId, id);
    const updated = await this.prisma.departure.update({
      where: { id },
      data: { status: 'CLOSED' },
    });

    this.socketGateway.emitDepartureUpdated(id, { status: 'CLOSED' });

    return updated;
  }

  async getWaitlist(tenantId: string, departureId: string) {
    // Verify departure exists
    await this.getDeparture(tenantId, departureId);

    return this.prisma.departureWaitlist.findMany({
      where: { departureId },
      include: { traveler: true },
      orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async promoteWaitlistMember(tenantId: string, departureId: string, waitlistId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Lock row
      const lockedDepartures = await tx.$queryRaw<any[]>`
        SELECT id, "availableCapacity" as available_capacity
        FROM departures 
        WHERE id = ${departureId} AND "tenantId" = ${tenantId}
        FOR UPDATE
      `;
      if (!lockedDepartures || lockedDepartures.length === 0) {
        throw new NotFoundException(`Departure ID ${departureId} not found`);
      }

      const lockedDep = lockedDepartures[0];
      const available = lockedDep.available_capacity;

      const waitlist = await tx.departureWaitlist.findUnique({
        where: { id: waitlistId },
      });

      if (!waitlist || waitlist.departureId !== departureId || waitlist.status !== 'PENDING') {
        throw new BadRequestException('Invalid waitlist record or already promoted/cancelled');
      }

      if (available <= 0) {
        throw new BadRequestException('Cannot promote waitlist: Departure is at full capacity');
      }

      // Promote waitlist
      await tx.departureWaitlist.update({
        where: { id: waitlistId },
        data: { status: 'PROMOTED' },
      });

      // Update traveler status
      await tx.traveler.update({
        where: { id: waitlist.travelerId },
        data: { status: 'BOOKED' },
      });

      // Decrement capacity
      const updated = await tx.departure.update({
        where: { id: departureId },
        data: { availableCapacity: available - 1 },
      });

      // Triggers Socket updates
      this.socketGateway.emitInventoryChanged(departureId, {
        availableCapacity: updated.availableCapacity,
      });

      return {
        message: 'Traveler promoted successfully from waitlist',
        departure: updated,
      };
    });
  }
}
