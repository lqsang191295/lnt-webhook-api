import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { HT_DMKhoaPhongService } from './HT_DMKhoaPhong.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/HT_DMKhoaPhong')
export class HT_DMKhoaPhongController {
  private readonly logger = new Logger(HT_DMKhoaPhongController.name);

  constructor(private readonly HT_DMKhoaPhongService: HT_DMKhoaPhongService) {}
}
