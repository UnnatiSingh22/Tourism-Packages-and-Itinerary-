import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';
import {
  CreatePackageDto,
  UpdatePackageDto,
  UpdatePricingDto,
  CalculatePricingDto,
} from './dto/package.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class PackagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async listPackages(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, data] = await Promise.all([
      this.prisma.tourPackage.count({ where }),
      this.prisma.tourPackage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
        include: { pricing: true },
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

  async createPackage(tenantId: string, dto: CreatePackageDto, userId: string) {
    // Validate unique uppercase code
    const existing = await this.prisma.tourPackage.findFirst({
      where: { code: dto.code.toUpperCase(), tenantId, isDeleted: false },
    });
    if (existing) {
      throw new BadRequestException(`Package code '${dto.code}' already exists`);
    }

    const pkg = await this.prisma.tourPackage.create({
      data: {
        tenantId,
        code: dto.code.toUpperCase(),
        name: dto.name,
        description: dto.description,
        category: dto.category,
        duration: dto.duration,
        basePrice: dto.basePrice,
        status: 'DRAFT',
        createdBy: userId,
      },
    });

    // Automatically create empty pricing configuration
    await this.prisma.packagePricing.create({
      data: {
        tenantId,
        packageId: pkg.id,
      },
    });

    return pkg;
  }

  async getPackage(tenantId: string, id: string) {
    const pkg = await this.prisma.tourPackage.findFirst({
      where: { id, tenantId, isDeleted: false },
      include: { pricing: true, itineraryDays: true },
    });
    if (!pkg) {
      throw new NotFoundException(`Package with ID '${id}' not found`);
    }
    return pkg;
  }

  async updatePackage(tenantId: string, id: string, dto: UpdatePackageDto, userId: string) {
    await this.getPackage(tenantId, id);

    return this.prisma.tourPackage.update({
      where: { id },
      data: {
        ...dto,
        updatedBy: userId,
      },
    });
  }

  // Lifecycle transitions
  async submitForApproval(tenantId: string, id: string) {
    const pkg = await this.getPackage(tenantId, id);
    if (pkg.status !== 'DRAFT') {
      throw new BadRequestException(`Only DRAFT packages can be submitted. Current status: ${pkg.status}`);
    }

    return this.prisma.tourPackage.update({
      where: { id },
      data: { status: 'PENDING_APPROVAL' },
    });
  }

  async approvePackage(tenantId: string, id: string) {
    const pkg = await this.getPackage(tenantId, id);
    if (pkg.status !== 'PENDING_APPROVAL') {
      throw new BadRequestException(`Only PENDING_APPROVAL packages can be approved. Current status: ${pkg.status}`);
    }

    // Constraints check for publishing:
    // 1. Itinerary days must exist
    const daysCount = await this.prisma.itineraryDay.count({
      where: { packageId: id, isDeleted: false },
    });
    if (daysCount === 0) {
      throw new BadRequestException('Cannot approve package: Itinerary days must exist.');
    }

    // 2. Pricing configuration must exist with some values
    const pricing = await this.prisma.packagePricing.findUnique({
      where: { packageId: id },
    });
    if (!pricing) {
      throw new BadRequestException('Cannot approve package: Package pricing configuration is missing.');
    }

    // 3. Active supplier contracts must exist
    const activeContracts = await this.prisma.supplierContract.count({
      where: {
        tenantId,
        status: 'ACTIVE',
        endDate: { gte: new Date() },
      },
    });
    if (activeContracts === 0) {
      throw new BadRequestException('Cannot approve package: No active supplier contracts exist.');
    }

    return this.prisma.tourPackage.update({
      where: { id },
      data: { status: 'PUBLISHED' },
    });
  }

  async archivePackage(tenantId: string, id: string) {
    await this.getPackage(tenantId, id);

    return this.prisma.tourPackage.update({
      where: { id },
      data: { status: 'ARCHIVED' },
    });
  }

  // Pricing configuration
  async getPricing(tenantId: string, packageId: string) {
    await this.getPackage(tenantId, packageId);
    const pricing = await this.prisma.packagePricing.findUnique({
      where: { packageId },
    });
    if (!pricing) {
      throw new NotFoundException(`Pricing config not found for Package ID ${packageId}`);
    }
    return pricing;
  }

  async updatePricing(tenantId: string, packageId: string, dto: UpdatePricingDto) {
    await this.getPackage(tenantId, packageId);
    return this.prisma.packagePricing.update({
      where: { packageId },
      data: dto,
    });
  }

  // Pricing engine logic with Redis caching
  async calculatePricing(tenantId: string, packageId: string, dto: CalculatePricingDto) {
    const { paxCount, childCount, infantCount, addOnsTotal } = dto;
    const cacheKey = `pricing-calc:${tenantId}:${packageId}:${paxCount}-${childCount}-${infantCount}-${addOnsTotal}`;

    // 1. Try Redis cache
    const cachedResult = await this.redisService.get(cacheKey);
    if (cachedResult) {
      return JSON.parse(cachedResult);
    }

    // 2. Compute from Database
    const pkg = await this.prisma.tourPackage.findFirst({
      where: { id: packageId, tenantId, isDeleted: false },
      include: { pricing: true },
    });

    if (!pkg) {
      throw new NotFoundException(`Package with ID ${packageId} not found`);
    }

    const basePrice = Number(pkg.basePrice);
    const pricing = pkg.pricing;
    const marginPerPax = pricing ? Number(pricing.marginPerPax) : 0;
    const seasonalAdjustment = pricing ? Number(pricing.seasonalAdjustment) : 0;
    const baseAddOns = pricing ? Number(pricing.addOnsTotal) : 0;
    const manualAddOns = Number(addOnsTotal || 0);

    // FinalPrice calculation:
    // FinalPrice = BasePrice + (PaxCount * MarginPerPax) + SeasonalAdjustment + AddOnsTotal
    const finalAdultUnitPrice = basePrice + marginPerPax + seasonalAdjustment;
    const adultTotal = paxCount * finalAdultUnitPrice;

    // Child: 75% of adult price
    const finalChildUnitPrice = finalAdultUnitPrice * 0.75;
    const childTotal = (childCount || 0) * finalChildUnitPrice;

    // Infant: 10% of adult price
    const finalInfantUnitPrice = finalAdultUnitPrice * 0.10;
    const infantTotal = (infantCount || 0) * finalInfantUnitPrice;

    // Add-ons total
    const totalAddOns = baseAddOns + manualAddOns;

    const grandTotal = adultTotal + childTotal + infantTotal + totalAddOns;

    const result = {
      adultCount: paxCount,
      adultUnitPrice: finalAdultUnitPrice,
      adultTotal,
      childCount: childCount || 0,
      childUnitPrice: finalChildUnitPrice,
      childTotal,
      infantCount: infantCount || 0,
      infantUnitPrice: finalInfantUnitPrice,
      infantTotal,
      totalAddOns,
      grandTotal,
    };

    // 3. Cache the computed result (TTL = 1 hour / 3600 seconds)
    await this.redisService.set(cacheKey, JSON.stringify(result), 3600);

    return result;
  }
}
