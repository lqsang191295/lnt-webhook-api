import { IsString, IsDate, IsBoolean } from 'class-validator';

export class HT_DMKhoaPhongDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  readed: boolean;

  @IsDate()
  created_at: Date;
}

