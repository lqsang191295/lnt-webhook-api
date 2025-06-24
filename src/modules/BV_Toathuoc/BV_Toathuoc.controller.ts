import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_ToathuocService } from './BV_Toathuoc.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_Toathuoc')
export class BV_ToathuocController {
  private readonly logger = new Logger(BV_ToathuocController.name);

  constructor(private readonly BV_ToathuocService: BV_ToathuocService) {}
}
