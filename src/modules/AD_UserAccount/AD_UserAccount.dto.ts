import { IsString, IsBoolean, IsOptional, IsDate } from 'class-validator';

export class AD_UserAccountDto {
  @IsString()
  UserID: string;

  @IsString()
  Password: string;

  @IsString()
  GroupID: string;

  @IsBoolean()
  Admin: boolean;

  @IsBoolean()
  SuperAdmin: boolean;

  @IsString()
  Description: string;

  @IsBoolean()
  CantChangePwd: boolean;

  @IsBoolean()
  PwdNeverExpired: boolean;

  @IsBoolean()
  MustChangePwd: boolean;

  @IsString()
  Email: string;

  @IsString()
  FingerID: string;

  @IsString()
  EmpID: string;

  @IsBoolean()
  Stop: boolean;

  @IsString()
  Khoa: string;

  @IsDate()
  UPDATE_DATE: Date;
}
