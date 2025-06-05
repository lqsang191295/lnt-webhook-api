import { IsString, IsNotEmpty, IsOptional, IsIn, IsBase64, IsDateString, IsInt } from 'class-validator';

export class CreatePacsReportDto {
  @IsString()
  @IsNotEmpty()
  patient_id: string;

  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @IsString()
  @IsNotEmpty()
  accession_no: string;

  @IsString()
  @IsNotEmpty()
  interpretation: string;

  @IsString()
  @IsNotEmpty()
  impression: string;

  @IsOptional()
  @IsString()
  suggession?: string | null;

  @IsString()
  @IsIn(['CT', 'MR', 'US', 'XR', 'MG', 'NM', 'PT']) // thêm modality tùy hệ thống
  modality: string;

  @IsString()
  @IsBase64()
  base64pdf: string;

  @IsDateString()
  report_datetime: string;

  @IsString()
  @IsNotEmpty()
  created_by: string;

  @IsInt()
  version: number;
}

export class PostDicomViewerDto {
  @IsString()
  @IsNotEmpty()
  study_iuid: string; // Study Instance UID of DICOM data

  @IsString()
  @IsOptional()
  study_desc?: string; // Study Description (optional nếu có thể null)

  @IsString()
  @IsNotEmpty()
  image_viewer_link: string; // Direct viewer image link

  @IsDateString()
  study_date: string; // Study Exam date (ISO 8601 format)

  @IsDateString()
  call_time: string; // Date and time of API request
}