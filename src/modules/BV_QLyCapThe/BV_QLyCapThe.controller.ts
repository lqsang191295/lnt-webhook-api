import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_QLyCapTheService } from './BV_QLyCapThe.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_QLyCapThe')
export class BV_QLyCapTheController {
  private readonly logger = new Logger(BV_QLyCapTheController.name);

  constructor(private readonly BV_QLyCapTheService: BV_QLyCapTheService) {}
}
