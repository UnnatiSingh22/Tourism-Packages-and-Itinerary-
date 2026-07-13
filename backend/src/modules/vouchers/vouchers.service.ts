import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SocketGateway } from '../../sockets/socket.gateway';
import { QueueService } from '../../queues/queue.service';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class VouchersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
    private readonly queueService: QueueService,
  ) {}

  async listVouchers(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
    };

    if (search) {
      where.voucherCode = { contains: search, mode: 'insensitive' };
    }

    const [total, data] = await Promise.all([
      this.prisma.voucher.count({ where }),
      this.prisma.voucher.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        include: { traveler: true, departure: true },
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

  async generateVoucher(tenantId: string, travelerId: string) {
    // 1. Fetch traveler with departure details
    const traveler = await this.prisma.traveler.findFirst({
      where: { id: travelerId, tenantId, isDeleted: false },
      include: { departure: true },
    });

    if (!traveler) {
      throw new NotFoundException(`Traveler with ID ${travelerId} not found`);
    }

    // 2. Compliance status check
    if (traveler.complianceStatus !== 'clear') {
      throw new BadRequestException(
        `Cannot generate voucher: Traveler compliance status is '${traveler.complianceStatus}'. It must be 'clear'.`,
      );
    }

    // 3. Departure active check
    if (!traveler.departure || traveler.departure.status !== 'ACTIVE') {
      throw new BadRequestException(
        `Cannot generate voucher: Assigned departure is not ACTIVE. Current status: ${
          traveler.departure ? traveler.departure.status : 'None'
        }`,
      );
    }

    // Check if voucher already exists
    const existing = await this.prisma.voucher.findFirst({
      where: { travelerId, departureId: traveler.departureId },
    });
    if (existing) {
      return existing;
    }

    // 4. Generate Voucher Code
    const voucherCode = `VOU-${Date.now()}-${traveler.passportNumber.slice(-4).toUpperCase()}`;

    const voucher = await this.prisma.voucher.create({
      data: {
        tenantId,
        travelerId,
        departureId: traveler.departureId,
        voucherCode,
        status: 'ISSUED',
        details: `Voucher for travel package on departure starting ${traveler.departure.startDate.toLocaleDateString()}`,
      },
    });

    // Notify clients real-time
    this.socketGateway.emitVoucherGenerated(voucher.id, {
      voucherCode: voucher.voucherCode,
      travelerName: `${traveler.firstName} ${traveler.lastName}`,
    });

    // Queue a background notification job
    await this.queueService.addJob('voucher-generation', 'VoucherGenerationJob', {
      voucherId: voucher.id,
      travelerId,
      tenantId,
    });

    return voucher;
  }

  async getVoucher(tenantId: string, id: string) {
    const voucher = await this.prisma.voucher.findFirst({
      where: { id, tenantId },
      include: { traveler: true, departure: true },
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async resendVoucher(tenantId: string, id: string) {
    const voucher = await this.getVoucher(tenantId, id);
    
    // Simulate resend by scheduling queue job and emitting event
    await this.queueService.addJob('voucher-generation', 'VoucherGenerationJob', {
      voucherId: voucher.id,
      travelerId: voucher.travelerId,
      tenantId,
      action: 'RESEND',
    });

    return {
      message: 'Voucher resend job queued successfully',
      voucherId: voucher.id,
    };
  }
}
