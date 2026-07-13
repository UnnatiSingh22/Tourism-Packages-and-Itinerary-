import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsObject,
} from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  triggerType: string; // e.g. DEPARTURE_CUTOFF, PASSPORT_EXPIRY, WAITLIST_PROMOTION

  @IsNotEmpty()
  @IsString()
  actionType: string; // e.g. EMAIL, CLOSE_DEPARTURE, PROMOTE_TRAVELER

  @IsOptional()
  @IsObject()
  conditions?: any;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
