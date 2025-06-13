import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { HT_DMPhongBanService } from './HT_DMPhongBan.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/HT_DMPhongBan')
export class HT_DMPhongBanController {
  private readonly logger = new Logger(HT_DMPhongBanController.name);

  constructor(private readonly HT_DMPhongBanService: HT_DMPhongBanService) {}
}
