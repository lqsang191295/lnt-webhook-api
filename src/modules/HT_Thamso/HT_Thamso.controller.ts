import { Controller, Get, Logger, Post } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso.service';
import { In } from 'typeorm';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('module/HT_Thamso')
export class HT_ThamsoController {
  private readonly logger = new Logger(HT_ThamsoController.name);

  constructor(private readonly htThamSoService: HT_ThamsoService) {}

  @Roles(['admin'])
  @Get()
  getAll() {
    this.logger.warn('Find all ht tham so..');

    return this.htThamSoService.findAll();
  }

  @Get('zalo-token')
  getZaloToken() {
    return this.htThamSoService.findById([
      { Ma: 'AccessToken_Zalo' },
      { Ma: 'RefreshToken_Zalo' },
    ]);
  }

  @Post('add')
  addThamsoTest() {
    return this.htThamSoService.createDataTest();
  }

  @Post('update-tham-so')
  updateThamsoTest() {
    return this.htThamSoService.updateDataTest();
  }
}
