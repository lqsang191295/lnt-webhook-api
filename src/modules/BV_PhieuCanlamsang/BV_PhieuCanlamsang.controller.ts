import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_PhieuCanlamsangService } from './BV_PhieuCanlamsang.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_PhieuCanlamsang')
export class BV_PhieuCanlamsangController {
  private readonly logger = new Logger(BV_PhieuCanlamsangController.name);

  constructor(private readonly BV_PhieuCanlamsangService: BV_PhieuCanlamsangService) {}
}
