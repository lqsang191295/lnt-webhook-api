import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { BV_GiayKhamSucKhoeService } from './BV_GiayKhamSucKhoe.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/BV_GiayKhamSucKhoe')
export class BV_GiayKhamSucKhoeController {
  private readonly logger = new Logger(BV_GiayKhamSucKhoeController.name);

  constructor(private readonly BV_GiayKhamSucKhoeService: BV_GiayKhamSucKhoeService) {}
}
