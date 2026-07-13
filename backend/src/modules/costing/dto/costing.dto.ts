import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCostSheetItemDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['SUPPLIER_COST', 'OPERATIONS_OVERHEAD', 'TAX'], {
    message: 'itemType must be SUPPLIER_COST, OPERATIONS_OVERHEAD, or TAX',
  })
  itemType: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  amount: number;
}

export class UpdateCostSheetItemDto {
  @IsOptional()
  @IsString()
  @IsIn(['SUPPLIER_COST', 'OPERATIONS_OVERHEAD', 'TAX'])
  itemType?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  amount?: number;
}
