import { IsString, IsDate } from 'class-validator';

export class HT_ThongbaoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  created_at: Date;
}
