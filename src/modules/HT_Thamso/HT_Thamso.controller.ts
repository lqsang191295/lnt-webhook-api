import { Controller, Get, Logger, Post } from '@nestjs/common';
import { HT_ThamsoService } from './HT_Thamso.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';

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

  @Public()
  @Get('zalo-token')
  async getZaloToken() {
    try {
    } catch (ex) {}

    try {
      const thamSoToken = await this.htThamSoService.findById([
        { Ma: 'AccessToken_Zalo' },
        { Ma: 'RefreshToken_Zalo' },
      ]);

      if (!thamSoToken || !thamSoToken.length) {
        return ApiResponse.success('Get token success!', {
          access_token: '',
          refresh_token: '',
        });
      }

      return ApiResponse.success('Get token success!', {
        access_token: thamSoToken[0].Thamso,
        refresh_token: thamSoToken[1].Thamso,
      });
    } catch (ex) {
      return ApiResponse.error('Get token failed!', 500, ex.message);
    }
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
