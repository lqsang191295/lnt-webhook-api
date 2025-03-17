import { Controller, Get, Post } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso.service';
import { In } from 'typeorm';

@Controller('module/HT_Thamso')
export class HT_ThamsoController {
  constructor(private readonly htThamSoService: HT_ThamsoService) {}

  @Get()
  getAll() {
    return this.htThamSoService.findAll();
  }

  @Get('zalo-token')
  getZaloToken() {
    return this.htThamSoService.findById('AccessToken_Zalo');
  }

  @Post('add-tham-so')
  addThamsoTest() {
    return this.htThamSoService.createDataTest();
  }

  @Post('update-tham-so')
  updateThamsoTest() {
    return this.htThamSoService.updateDataTest();
  }
}
