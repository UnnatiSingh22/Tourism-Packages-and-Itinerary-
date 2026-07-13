import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsOptional,
  IsDateString,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDayDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  dayNumber: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsOptional()
  @IsDateString()
  hotelCheckIn?: string;

  @IsOptional()
  @IsDateString()
  hotelCheckOut?: string;
}

export class UpdateDayDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  dayNumber?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsOptional()
  @IsDateString()
  hotelCheckIn?: string;

  @IsOptional()
  @IsDateString()
  hotelCheckOut?: string;
}

export class ReorderDaysDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  dayIds: string[];
}

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  supplierId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dependencies?: string[] = [];
}
