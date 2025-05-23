import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
} from 'class-validator';

export class PermitDto {
  @IsNumber()
  senderId: number;

  @IsString()
  name: string;

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

  files?: string[];
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

export class UpdateTotalPermitDto {
  @IsNotEmpty()
  receiver: any;

  @IsNotEmpty()
  sender: any;

  @IsNumber()
  @IsNotEmpty()
  templateId: number;

  @IsString()
  companyName: string;

  @IsString()
  name: string;

  @IsNumber()
  peopleNumber: number;

  @IsString()
  workActivities: string;

  @IsString()
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

export class QueryDto {
  q?: string;
  status?: string;
  limit: number;
  page: number;
}
