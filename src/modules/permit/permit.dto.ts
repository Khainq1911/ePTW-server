import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermitDto {

  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

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
  senderId: number;

  @IsNumber()
  changedBy: number;

  @IsString()
  reason: string;

  @IsNumber()
  permitId: number;
}
