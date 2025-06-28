import { IsString, IsOptional } from 'class-validator';

export class HT_DMNhanSuDto {
  @IsString()
  Ma: string;

  @IsString()
  Thamso: string;

  @IsString()
  @IsOptional()
  Diengiai?: string;
}
