import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Reporting & Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur/reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('profitability')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get general profitability margins report' })
  async getProfitability(@CurrentUser('tenantId') tenantId: string) {
    return this.reportsService.getProfitabilityReport(tenantId);
  }

  @Get('utilization')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get capacity/occupancy utilization report' })
  async getUtilization(@CurrentUser('tenantId') tenantId: string) {
    return this.reportsService.getUtilizationReport(tenantId);
  }

  @Get('supplier-settlement')
  @Roles('tour_manager', 'finance_mgr')
  @ApiOperation({ summary: 'Get supplier settlements summary report' })
  async getSupplierSettlement(@CurrentUser('tenantId') tenantId: string) {
    return this.reportsService.getSupplierSettlementReport(tenantId);
  }
}
