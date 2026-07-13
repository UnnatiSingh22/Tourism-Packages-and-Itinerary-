import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfitabilityReport(tenantId: string) {
    const departures = await this.prisma.departure.findMany({
      where: { tenantId, isDeleted: false },
      include: { package: true, costSheetItems: true, travelers: { where: { status: 'BOOKED' } } },
    });

    let overallRevenue = 0;
    let overallCosts = 0;

    const breakdown = departures.map((dep) => {
      const revenue = dep.travelers.length * Number(dep.package.basePrice);
      const costs = dep.costSheetItems.reduce((acc, item) => acc + Number(item.amount), 0);
      const profit = revenue - costs;
      const marginPercent = revenue > 0 ? (profit / revenue) * 100 : 0;

      overallRevenue += revenue;
      overallCosts += costs;

      return {
        departureId: dep.id,
        name: dep.name,
        packageCode: dep.package.code,
        bookingsCount: dep.travelers.length,
        revenue,
        costs,
        profit,
        marginPercent,
      };
    });

    const overallProfit = overallRevenue - overallCosts;
    const overallMargin = overallRevenue > 0 ? (overallProfit / overallRevenue) * 100 : 0;

    return {
      overallRevenue,
      overallCosts,
      overallProfit,
      overallMarginPercent: overallMargin,
      departuresBreakdown: breakdown,
    };
  }

  async getUtilizationReport(tenantId: string) {
    const departures = await this.prisma.departure.findMany({
      where: { tenantId, isDeleted: false },
      include: {
        travelers: { where: { status: 'BOOKED' } },
        waitlist: { where: { status: 'PENDING' } },
      },
    });

    let totalCapacity = 0;
    let totalBooked = 0;
    let totalWaitlisted = 0;

    const breakdown = departures.map((dep) => {
      const booked = dep.travelers.length;
      const waitlist = dep.waitlist.length;
      const utilization = dep.capacity > 0 ? (booked / dep.capacity) * 100 : 0;

      totalCapacity += dep.capacity;
      totalBooked += booked;
      totalWaitlisted += waitlist;

      return {
        departureId: dep.id,
        name: dep.name,
        capacity: dep.capacity,
        bookedCount: booked,
        waitlistCount: waitlist,
        utilizationPercent: utilization,
      };
    });

    const averageUtilization = totalCapacity > 0 ? (totalBooked / totalCapacity) * 100 : 0;

    return {
      totalCapacity,
      totalBooked,
      totalWaitlisted,
      averageUtilizationPercent: averageUtilization,
      departuresBreakdown: breakdown,
    };
  }

  async getSupplierSettlementReport(tenantId: string) {
    // Aggregates confirmed allocations and cost items by supplier
    const suppliers = await this.prisma.supplier.findMany({
      where: { tenantId, isDeleted: false },
      include: {
        allocations: {
          where: { status: 'CONFIRMED' },
          include: { departure: true },
        },
      },
    });

    return suppliers.map((sup) => {
      // Confirmed resources allocations value calculation
      // Summing up allocation quantities (or estimate values, e.g. base allocations cost sheet representation)
      const confirmedAllocationsCount = sup.allocations.length;
      const resourcesSum = sup.allocations.reduce((acc, alloc) => acc + alloc.quantity, 0);

      // List of departures they are involved in
      const departuresInvolved = Array.from(
        new Set(sup.allocations.map((alloc) => alloc.departure.name)),
      );

      return {
        supplierId: sup.id,
        name: sup.name,
        email: sup.email,
        phone: sup.phone,
        confirmedAllocationsCount,
        resourcesAllocatedCount: resourcesSum,
        activeDepartures: departuresInvolved,
        settlementStatus: 'PENDING_INVOICE',
      };
    });
  }
}
