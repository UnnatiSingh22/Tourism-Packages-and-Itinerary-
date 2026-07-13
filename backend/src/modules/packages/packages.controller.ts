import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import {
  CreatePackageDto,
  UpdatePackageDto,
  UpdatePricingDto,
  CalculatePricingDto,
} from './dto/package.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Packages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur/packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get list of packages with filtering/pagination' })
  async list(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.packagesService.listPackages(tenantId, pagination);
  }

  @Post()
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Create a new package' })
  async create(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('sub') userId: string,
    @Body() dto: CreatePackageDto,
  ) {
    return this.packagesService.createPackage(tenantId, dto, userId);
  }

  @Get(':id')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get a package details' })
  async get(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.packagesService.getPackage(tenantId, id);
  }

  @Patch(':id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Update a package' })
  async update(
    @CurrentUser('tenantId') tenantId: string,
    @CurrentUser('sub') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePackageDto,
  ) {
    return this.packagesService.updatePackage(tenantId, id, dto, userId);
  }

  @Post(':id/submit')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Submit package for approval' })
  async submit(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.packagesService.submitForApproval(tenantId, id);
  }

  @Post(':id/approve')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Approve package' })
  async approve(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.packagesService.approvePackage(tenantId, id);
  }

  @Post(':id/archive')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Archive package' })
  async archive(@CurrentUser('tenantId') tenantId: string, @Param('id') id: string) {
    return this.packagesService.archivePackage(tenantId, id);
  }

  // Pricing Sub-Routes
  @Get(':id/pricing')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get pricing details of a package' })
  async getPricing(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.packagesService.getPricing(tenantId, id);
  }

  @Patch(':id/pricing')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Update pricing configuration of a package' })
  async updatePricing(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdatePricingDto,
  ) {
    return this.packagesService.updatePricing(tenantId, id, dto);
  }

  @Post(':id/pricing/calculate')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Calculate pricing estimation' })
  async calculate(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CalculatePricingDto,
  ) {
    return this.packagesService.calculatePricing(tenantId, id, dto);
  }
}
