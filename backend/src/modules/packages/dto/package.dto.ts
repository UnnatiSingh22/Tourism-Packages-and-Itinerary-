import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsNumber,
  Matches,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z0-9_-]+$/, {
    message: 'Code must be uppercase alphanumeric (can contain underscores/dashes)',
  })
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(90)
  @Type(() => Number)
  duration: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  basePrice: number;
}

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(90)
  @Type(() => Number)
  duration?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  basePrice?: number;
}

export class UpdatePricingDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  marginPerPax?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  seasonalAdjustment?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  addOnsTotal?: number;
}

export class CalculatePricingDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  paxCount: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  childCount?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  infantCount?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  addOnsTotal?: number = 0;
}
