import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CostingService } from './costing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { CreateCostSheetItemDto, UpdateCostSheetItemDto } from './dto/costing.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Costing & Budgets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur')
export class CostingController {
  constructor(private readonly costingService: CostingService) {}

  @Get('departures/:departureId/cost-sheet')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get cost sheet with profit breakdown for a departure' })
  async getCostSheet(
    @CurrentUser('tenantId') tenantId: string,
    @Param('departureId') departureId: string,
  ) {
    return this.costingService.getCostSheet(tenantId, departureId);
  }

  @Post('departures/:departureId/cost-sheet/items')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Add a cost sheet item to a departure' })
  async addItem(
    @CurrentUser('tenantId') tenantId: string,
    @Param('departureId') departureId: string,
    @Body() dto: CreateCostSheetItemDto,
  ) {
    return this.costingService.addCostSheetItem(tenantId, departureId, dto);
  }

  @Patch('cost-sheet/items/:id')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Update an existing cost sheet item' })
  async updateItem(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCostSheetItemDto,
  ) {
    return this.costingService.updateCostSheetItem(tenantId, id, dto);
  }
}
