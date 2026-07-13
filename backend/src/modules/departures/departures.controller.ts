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
import { DeparturesService } from './departures.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import {
  CreateDepartureDto,
  UpdateDepartureDto,
  UpdateInventoryDto,
} from './dto/departure.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Departures')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur/departures')
export class DeparturesController {
  constructor(private readonly departuresService: DeparturesService) {}

  @Get()
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get list of departures' })
  async list(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.departuresService.listDepartures(tenantId, pagination);
  }

  @Post()
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Schedule a new departure' })
  async create(
    @CurrentUser('tenantId') tenantId: string,
    @Body() dto: CreateDepartureDto,
  ) {
    return this.departuresService.createDeparture(tenantId, dto);
  }

  @Get(':id')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get departure details' })
  async get(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.departuresService.getDeparture(tenantId, id);
  }

  @Patch(':id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Update departure details' })
  async update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateDepartureDto,
  ) {
    return this.departuresService.updateDeparture(tenantId, id, dto);
  }

  @Patch(':id/inventory')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Update departure capacity/inventory with Row Locking' })
  async updateInventory(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateInventoryDto,
  ) {
    return this.departuresService.updateInventory(tenantId, id, dto);
  }

  @Post(':id/close')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Close departure cutoff' })
  async close(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.departuresService.closeDeparture(tenantId, id);
  }

  @Get(':id/waitlist')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Get waitlist for a departure' })
  async getWaitlist(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.departuresService.getWaitlist(tenantId, id);
  }

  @Post(':id/waitlist/:waitlistId/promote')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Promote a traveler from the waitlist' })
  async promote(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') departureId: string,
    @Param('waitlistId') waitlistId: string,
  ) {
    return this.departuresService.promoteWaitlistMember(tenantId, departureId, waitlistId);
  }
}
