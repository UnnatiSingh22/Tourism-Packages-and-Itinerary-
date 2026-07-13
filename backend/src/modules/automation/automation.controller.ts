import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AutomationService } from './automation.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { CreateRuleDto } from './dto/automation.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Automation Workflows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur/automation')
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Get('rules')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Get list of automation rules' })
  async listRules(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.automationService.listRules(tenantId, pagination);
  }

  @Post('rules')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Create a new automation rule' })
  async createRule(
    @CurrentUser('tenantId') tenantId: string,
    @Body() dto: CreateRuleDto,
  ) {
    return this.automationService.createRule(tenantId, dto);
  }

  @Get('logs')
  @Roles('tour_manager')
  @ApiOperation({ summary: 'Get audit logs of automated executions' })
  async listLogs(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.automationService.getLogs(tenantId, pagination);
  }
}
