import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_TiepnhanBenhService } from './BV_TiepnhanBenh.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_TiepnhanBenh')
export class BV_TiepnhanBenhController {
  private readonly logger = new Logger(BV_TiepnhanBenhController.name);

  constructor(private readonly BV_TiepnhanBenhService: BV_TiepnhanBenhService) {}
}
