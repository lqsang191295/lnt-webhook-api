import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_PhieuSieuamService } from './BV_PhieuSieuam.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_PhieuSieuam')
export class BV_PhieuSieuamController {
  private readonly logger = new Logger(BV_PhieuSieuamController.name);

  constructor(private readonly BV_PhieuSieuamService: BV_PhieuSieuamService) {}
}
