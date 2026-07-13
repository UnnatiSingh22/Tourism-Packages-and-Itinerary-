import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCostSheetItemDto, UpdateCostSheetItemDto } from './dto/costing.dto';

@Injectable()
export class CostingService {
  constructor(private readonly prisma: PrismaService) {}

  async getCostSheet(tenantId: string, departureId: string) {
    // 1. Verify departure exists
    const departure = await this.prisma.departure.findFirst({
      where: { id: departureId, tenantId, isDeleted: false },
      include: { package: true },
    });

    if (!departure) {
      throw new NotFoundException(`Departure with ID ${departureId} not found`);
    }

    // 2. Fetch all cost sheet items
    const items = await this.prisma.costSheetItem.findMany({
      where: { departureId },
      orderBy: { createdAt: 'asc' },
    });

    // 3. Fetch bookings revenue (sum of package basePrice for all BOOKED travelers)
    const travelersCount = await this.prisma.traveler.count({
      where: { departureId, tenantId, status: 'BOOKED', isDeleted: false },
    });

    const basePackagePrice = Number(departure.package.basePrice);
    const totalRevenue = travelersCount * basePackagePrice;

    // 4. Calculate cost items sum by type
    let supplierCost = 0;
    let operationsOverhead = 0;
    let taxes = 0;

    for (const item of items) {
      const amount = Number(item.amount);
      if (item.itemType === 'SUPPLIER_COST') {
        supplierCost += amount;
      } else if (item.itemType === 'OPERATIONS_OVERHEAD') {
        operationsOverhead += amount;
      } else if (item.itemType === 'TAX') {
        taxes += amount;
      }
    }

    const totalCosts = supplierCost + operationsOverhead + taxes;
    const netProfit = totalRevenue - totalCosts;

    return {
      departureId,
      departureName: departure.name,
      bookingsCount: travelersCount,
      packageBasePrice: basePackagePrice,
      totalRevenue,
      costsSummary: {
        supplierCost,
        operationsOverhead,
        taxes,
        totalCosts,
      },
      netProfit,
      costSheetItems: items,
    };
  }

  async addCostSheetItem(tenantId: string, departureId: string, dto: CreateCostSheetItemDto) {
    const departure = await this.prisma.departure.findFirst({
      where: { id: departureId, tenantId, isDeleted: false },
    });

    if (!departure) {
      throw new NotFoundException(`Departure with ID ${departureId} not found`);
    }

    return this.prisma.costSheetItem.create({
      data: {
        tenantId,
        departureId,
        itemType: dto.itemType,
        description: dto.description,
        amount: dto.amount,
      },
    });
  }

  async updateCostSheetItem(tenantId: string, id: string, dto: UpdateCostSheetItemDto) {
    const item = await this.prisma.costSheetItem.findUnique({
      where: { id },
    });

    if (!item || item.tenantId !== tenantId) {
      throw new NotFoundException(`Cost sheet item with ID ${id} not found`);
    }

    return this.prisma.costSheetItem.update({
      where: { id },
      data: dto,
    });
  }
}
