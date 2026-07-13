import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SocketGateway } from '../../sockets/socket.gateway';
import {
  CreateSupplierDto,
  CreateContractDto,
  CreateAllocationDto,
  UpdateAllocationDto,
} from './dto/supplier.dto';
import { PaginationDto } from '../../common/pagination/pagination.dto';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly socketGateway: SocketGateway,
  ) {}

  async listSuppliers(tenantId: string, pagination: PaginationDto) {
    const { page, limit, search, sortBy, sortOrder } = pagination;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      isDeleted: false,
    };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    const [total, data] = await Promise.all([
      this.prisma.supplier.count({ where }),
      this.prisma.supplier.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy || 'createdAt']: sortOrder || 'desc' },
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

  async createSupplier(tenantId: string, dto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: {
        tenantId,
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        status: 'ACTIVE',
      },
    });
  }

  // Contracts CRUD
  async listContracts(tenantId: string, supplierId: string) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: supplierId, tenantId, isDeleted: false },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    return this.prisma.supplierContract.findMany({
      where: { supplierId },
      orderBy: { endDate: 'desc' },
    });
  }

  async createContract(tenantId: string, supplierId: string, dto: CreateContractDto) {
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: supplierId, tenantId, isDeleted: false },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }

    const startDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    if (endDate <= startDate) {
      throw new BadRequestException('Contract end date must be after start date');
    }

    return this.prisma.supplierContract.create({
      data: {
        tenantId,
        supplierId,
        contractNumber: dto.contractNumber,
        startDate,
        endDate,
        status: 'ACTIVE',
        terms: dto.terms,
      },
    });
  }

  // Allocations CRUD
  async listAllocations(tenantId: string, departureId: string) {
    const departure = await this.prisma.departure.findFirst({
      where: { id: departureId, tenantId, isDeleted: false },
    });
    if (!departure) {
      throw new NotFoundException(`Departure with ID ${departureId} not found`);
    }

    return this.prisma.departureAllocation.findMany({
      where: { departureId },
      include: { supplier: true, contract: true },
    });
  }

  async createAllocation(tenantId: string, departureId: string, dto: CreateAllocationDto) {
    const departure = await this.prisma.departure.findFirst({
      where: { id: departureId, tenantId, isDeleted: false },
    });
    if (!departure) {
      throw new NotFoundException(`Departure with ID ${departureId} not found`);
    }

    // Verify supplier & contract
    const supplier = await this.prisma.supplier.findFirst({
      where: { id: dto.supplierId, tenantId, isDeleted: false },
    });
    if (!supplier) {
      throw new NotFoundException(`Supplier ID ${dto.supplierId} not found`);
    }

    const contract = await this.prisma.supplierContract.findFirst({
      where: { id: dto.contractId, supplierId: dto.supplierId },
    });
    if (!contract) {
      throw new NotFoundException(`Contract ID ${dto.contractId} not found for this supplier`);
    }

    return this.prisma.departureAllocation.create({
      data: {
        tenantId,
        departureId,
        supplierId: dto.supplierId,
        contractId: dto.contractId,
        resourceType: dto.resourceType,
        quantity: dto.quantity,
        status: 'PENDING',
      },
    });
  }

  async updateAllocation(tenantId: string, id: string, dto: UpdateAllocationDto) {
    const allocation = await this.prisma.departureAllocation.findUnique({
      where: { id },
    });
    if (!allocation || allocation.tenantId !== tenantId) {
      throw new NotFoundException(`Allocation with ID ${id} not found`);
    }

    return this.prisma.departureAllocation.update({
      where: { id },
      data: dto,
    });
  }

  // Confirm allocation & validate contract dates
  async confirmAllocation(tenantId: string, id: string) {
    const allocation = await this.prisma.departureAllocation.findUnique({
      where: { id },
      include: { contract: true, departure: true },
    });

    if (!allocation || allocation.tenantId !== tenantId) {
      throw new NotFoundException(`Allocation with ID ${id} not found`);
    }

    if (allocation.contract.status !== 'ACTIVE') {
      throw new BadRequestException('Cannot confirm allocation: Associated supplier contract is not ACTIVE');
    }

    // Allocation validation: contract validity window check
    // The departure start date and end date must fall within the contract validity window.
    const depStart = new Date(allocation.departure.startDate);
    const depEnd = new Date(allocation.departure.endDate);
    const contractStart = new Date(allocation.contract.startDate);
    const contractEnd = new Date(allocation.contract.endDate);

    if (depStart < contractStart || depEnd > contractEnd) {
      throw new BadRequestException(
        `Cannot confirm allocation: Departure dates (${depStart.toLocaleDateString()} - ${depEnd.toLocaleDateString()}) lie outside the contract active window (${contractStart.toLocaleDateString()} - ${contractEnd.toLocaleDateString()})`,
      );
    }

    const confirmed = await this.prisma.departureAllocation.update({
      where: { id },
      data: { status: 'CONFIRMED' },
    });

    this.socketGateway.emitAllocationConfirmed(id, { quantity: confirmed.quantity });

    return confirmed;
  }
}
