import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckBacSiDto {
  @ApiProperty({ example: 'doctor01' })
  @IsString()
  user: string;

  @ApiProperty({ example: 'mypassword123' })
  @IsString()
  pass: string;
}