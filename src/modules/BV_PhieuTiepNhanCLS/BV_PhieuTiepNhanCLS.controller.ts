import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_PhieuTiepNhanCLSService } from './BV_PhieuTiepNhanCLS.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_PhieuTiepNhanCLS')
export class BV_PhieuTiepNhanCLSController {
  private readonly logger = new Logger(BV_PhieuTiepNhanCLSController.name);

  constructor(private readonly BV_PhieuTiepNhanCLSService: BV_PhieuTiepNhanCLSService) {}
}
