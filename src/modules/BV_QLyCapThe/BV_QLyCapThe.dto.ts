import { IsString, IsDate, IsBoolean } from 'class-validator';

export class BV_QLyCapTheDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  readed: boolean;

  @IsDate()
  created_at: Date;
}


export class PartientInfoDto {
  @IsString()
  patient_id: string;

  @IsString()
  patient_name: string;

  @IsDate()
  birth_day: boolean;

  @IsString()
  address: Date;
}
