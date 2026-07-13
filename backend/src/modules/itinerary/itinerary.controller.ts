import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ItineraryService } from './itinerary.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import {
  CreateDayDto,
  UpdateDayDto,
  ReorderDaysDto,
  CreateActivityDto,
} from './dto/itinerary.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Itinerary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur')
export class ItineraryController {
  constructor(private readonly itineraryService: ItineraryService) {}

  @Get('packages/:packageId/itinerary')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get list of itinerary days for a package' })
  async listDays(
    @CurrentUser('tenantId') tenantId: string,
    @Param('packageId') packageId: string,
  ) {
    return this.itineraryService.listDays(tenantId, packageId);
  }

  @Post('packages/:packageId/itinerary/days')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Add a new day to a package' })
  async addDay(
    @CurrentUser('tenantId') tenantId: string,
    @Param('packageId') packageId: string,
    @Body() dto: CreateDayDto,
  ) {
    return this.itineraryService.addDay(tenantId, packageId, dto);
  }

  @Patch('itinerary/days/:id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Update an itinerary day details' })
  async updateDay(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateDayDto,
  ) {
    return this.itineraryService.updateDay(tenantId, id, dto);
  }

  @Delete('itinerary/days/:id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Delete an itinerary day' })
  async deleteDay(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.itineraryService.deleteDay(tenantId, id);
  }

  @Post('packages/:packageId/itinerary/reorder')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Reorder days sequence for a package' })
  async reorderDays(
    @CurrentUser('tenantId') tenantId: string,
    @Param('packageId') packageId: string,
    @Body() dto: ReorderDaysDto,
  ) {
    return this.itineraryService.reorderDays(tenantId, packageId, dto);
  }

  @Post('itinerary/days/:id/validate')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Validate itinerary day (DAG, hotel, resource booking)' })
  async validateDay(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.itineraryService.validateItineraryDay(tenantId, id);
  }

  // Activities Routes
  @Get('itinerary/days/:id/activities')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Get activities list for a day' })
  async listActivities(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.itineraryService.listActivities(tenantId, id);
  }

  @Post('itinerary/days/:id/activities')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Add activity to an itinerary day' })
  async addActivity(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: CreateActivityDto,
  ) {
    return this.itineraryService.addActivity(tenantId, id, dto);
  }

  @Delete('itinerary/activities/:id')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Delete an activity' })
  async deleteActivity(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.itineraryService.deleteActivity(tenantId, id);
  }
}
