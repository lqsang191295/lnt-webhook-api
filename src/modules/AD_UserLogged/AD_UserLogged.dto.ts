import { IsString, IsBoolean, IsDate } from 'class-validator';

export class AD_UserLoggedDto {
  @IsString()
  UserID: string;

  @IsString()
  Device: string;

  @IsString()
  TokenDevice: string;

  @IsBoolean()
  IsMainDevice: boolean;

  @IsDate()
  create_at: Date;

  @IsBoolean()
  Accepted: boolean;
}
