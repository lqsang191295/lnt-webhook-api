import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_PhieuChidinhDVCTService } from './BV_PhieuChidinhDVCT.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_PhieuChidinhDVCT')
export class BV_PhieuChidinhDVCTController {
  private readonly logger = new Logger(BV_PhieuChidinhDVCTController.name);

  constructor(private readonly BV_PhieuChidinhDVCTService: BV_PhieuChidinhDVCTService) {}
}
