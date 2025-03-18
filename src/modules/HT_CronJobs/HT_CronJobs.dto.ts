import { IsString, IsOptional } from 'class-validator';

export class HT_CronJobsDto {
  @IsString()
  Ma: string;

  @IsString()
  Thamso: string;

  @IsString()
  @IsOptional()
  Diengiai?: string;
}
