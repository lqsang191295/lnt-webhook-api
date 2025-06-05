import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_PhieuXetNghiemService } from './BV_PhieuXetNghiem.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_PhieuXetNghiem')
export class BV_PhieuXetNghiemController {
  private readonly logger = new Logger(BV_PhieuXetNghiemController.name);

  constructor(private readonly BV_PhieuXetNghiemService: BV_PhieuXetNghiemService) {}
}
