import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { TravelersService } from './travelers.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { PaginationDto } from '../../common/pagination/pagination.dto';
import { CreateTravelerDto, UpdateTravelerDto } from './dto/traveler.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Travelers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/tur/travelers')
export class TravelersController {
  constructor(private readonly travelersService: TravelersService) {}

  @Get()
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Get list of travelers' })
  async list(
    @CurrentUser('tenantId') tenantId: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.travelersService.listTravelers(tenantId, pagination);
  }

  @Post()
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Create a new traveler/booking with inventory allocation' })
  async create(
    @CurrentUser('tenantId') tenantId: string,
    @Body() dto: CreateTravelerDto,
  ) {
    return this.travelersService.createTraveler(tenantId, dto);
  }

  @Get(':id')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Get traveler details' })
  async get(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.travelersService.getTraveler(tenantId, id);
  }

  @Patch(':id')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Update traveler details' })
  async update(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTravelerDto,
  ) {
    return this.travelersService.updateTraveler(tenantId, id, dto);
  }

  @Get(':id/documents/expiry-check')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Check traveler passport compliance status' })
  async expiryCheck(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.travelersService.checkCompliance(tenantId, id);
  }

  @Post(':id/documents')
  @Roles('tour_manager', 'ticketing_exec')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload traveler compliance document (passport/visa)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        documentType: { type: 'string', example: 'passport' },
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  async uploadDoc(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body('documentType') documentType: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.travelersService.uploadDocument(tenantId, id, documentType || 'passport', file);
  }

  @Post(':id/cancel')
  @Roles('tour_manager', 'ticketing_exec')
  @ApiOperation({ summary: 'Cancel traveler booking and process refunds / waitlist' })
  async cancel(
    @CurrentUser('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.travelersService.cancelBooking(tenantId, id);
  }
}
