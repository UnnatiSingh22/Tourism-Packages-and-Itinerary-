import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateContractDto {
  @IsNotEmpty()
  @IsString()
  contractNumber: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  terms?: string;
}

export class CreateAllocationDto {
  @IsNotEmpty()
  @IsString()
  supplierId: string;

  @IsNotEmpty()
  @IsString()
  contractId: string;

  @IsNotEmpty()
  @IsString()
  resourceType: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}

export class UpdateAllocationDto {
  @IsOptional()
  @IsString()
  resourceType?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity?: number;
}
