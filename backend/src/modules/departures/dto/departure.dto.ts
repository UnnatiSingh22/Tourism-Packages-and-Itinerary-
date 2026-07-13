import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDepartureDto {
  @IsNotEmpty()
  @IsString()
  packageId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  capacity: number;
}

export class UpdateDepartureDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  capacity?: number;
}

export class UpdateInventoryDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  capacity: number;
}
