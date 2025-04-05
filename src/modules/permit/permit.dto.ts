import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermitDto {
  to: any;

  @IsNumber()
  applicantId: number;

  @IsNumber()
  templateId: number;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsNumber()
  peopleNumber: number;

  @IsString()
  @IsNotEmpty()
  workActivities: string;

  @IsString()
  @IsNotEmpty()
  equipments: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNotEmpty()
  data: any;
}

export class UpdatePermitDto {
  @IsString()
  status?: string;

  @IsNumber()
  changedBy: number;

  @IsString()
  reason: string;

  @IsNumber()
  permitId: number;
}
