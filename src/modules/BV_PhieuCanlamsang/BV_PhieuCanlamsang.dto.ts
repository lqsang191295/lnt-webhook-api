import { IsString, IsDate, IsBoolean } from 'class-validator';

export class BV_PhieuCanlamsangDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  readed: boolean;

  @IsDate()
  created_at: Date;
}

