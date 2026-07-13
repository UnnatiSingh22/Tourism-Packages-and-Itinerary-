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
import { SuppliersService } from './suppliers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import {
  CreateSupplierDto,
  CreateContractDto,
  CreateAllocationDto,
  UpdateAllocationDto,
} from './dto/supplier.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Suppliers & Allocations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get('suppliers')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get list of suppliers' })
  async listSuppliers(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.suppliersService.listSuppliers(tenantId, pagination);
  }

  @Post('suppliers')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Create a new supplier' })
  async createSupplier(
    @CurrentUser('tenantId') tenantId: string,
    @Body() dto: CreateSupplierDto,
  ) {
    return this.suppliersService.createSupplier(tenantId, dto);
  }

  @Get('suppliers/:id/contracts')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get contract list of a supplier' })
  async listContracts(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.suppliersService.listContracts(tenantId, id);
  }

  @Post('suppliers/:id/contracts')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Create a contract for a supplier' })
  async createContract(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateContractDto,
  ) {
    return this.suppliersService.createContract(tenantId, id, dto);
  }

  // Allocations Routes
  @Get('departures/:departureId/allocations')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Get resource allocations for a departure' })
  async listAllocations(
    @CurrentUser('tenantId') tenantId: string,
    @Param('departureId') departureId: string,
  ) {
    return this.suppliersService.listAllocations(tenantId, departureId);
  }

  @Post('departures/:departureId/allocations')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Create a resource allocation for a departure' })
  async createAllocation(
    @CurrentUser('tenantId') tenantId: string,
    @Param('departureId') departureId: string,
    @Body() dto: CreateAllocationDto,
  ) {
    return this.suppliersService.createAllocation(tenantId, departureId, dto);
  }

  @Patch('allocations/:id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Update allocation quantity or resource types' })
  async updateAllocation(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateAllocationDto,
  ) {
    return this.suppliersService.updateAllocation(tenantId, id, dto);
  }

  @Post('allocations/:id/confirm')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Confirm resource allocation against contract' })
  async confirm(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.suppliersService.confirmAllocation(tenantId, id);
  }
}
