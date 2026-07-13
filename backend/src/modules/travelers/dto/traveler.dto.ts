import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  IsDateString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateTravelerDto {
  @IsNotEmpty()
  @IsString()
  departureId: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone must match E164 international standard formatting (e.g. +1234567890)',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  passportNumber: string;

  @IsNotEmpty()
  @IsDateString()
  passportExpiry: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 3, {
    message: 'Nationality must be a valid 2 or 3 character ISO country code',
  })
  nationality: string;
}

export class UpdateTravelerDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone must match E164 international standard formatting',
  })
  phone?: string;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsDateString()
  passportExpiry?: string;

  @IsOptional()
  @IsString()
  @Length(2, 3, {
    message: 'Nationality must be a valid 2 or 3 character ISO country code',
  })
  nationality?: string;
}
export class UploadDocumentDto {
  @IsNotEmpty()
  @IsString()
  documentType: string; // e.g. passport, visa
}
