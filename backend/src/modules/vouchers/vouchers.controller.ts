import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Vouchers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get('vouchers')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get list of vouchers' })
  async list(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.vouchersService.listVouchers(tenantId, pagination);
  }

  @Post('travelers/:travelerId/vouchers/generate')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Generate voucher for a compliant traveler' })
  async generate(
    @CurrentUser('tenantId') tenantId: string,
    @Param('travelerId') travelerId: string,
  ) {
    return this.vouchersService.generateVoucher(tenantId, travelerId);
  }

  @Get('vouchers/:id')
  @Roles('tour_manager', 'ticketing_exec', 'finance_mgr')
  @ApiOperation({ summary: 'Get voucher details' })
  async get(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.vouchersService.getVoucher(tenantId, id);
  }

  @Post('vouchers/:id/resend')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Trigger resending voucher notifications' })
  async resend(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.vouchersService.resendVoucher(tenantId, id);
  }
}
