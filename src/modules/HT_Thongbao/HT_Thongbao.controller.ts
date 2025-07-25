import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { HT_ThongbaoService } from './HT_Thongbao.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/HT_Thongbao')
export class HT_ThongbaoController {
  private readonly logger = new Logger(HT_ThongbaoController.name);

  constructor(private readonly ht_ThongbaoService: HT_ThongbaoService) {}

  @Get('all')
  async getThongBao() {
    try {
      const result = await this.ht_ThongbaoService.findAll();
      const sorted = result.sort((a, b) =>
        a.created_at > b.created_at ? -1 : 1,
      );

      return ApiResponse.success('Get thong bao success!', sorted);
    } catch (ex) {
      return ApiResponse.error('Get thong bao failed!', 500, ex.message);
    }
  }

  @Post('add')
  async addThongBao(
    @Body('name') name: string,
    @Body('func') func: string,
    @Body('time') time: string,
    @Body('status') status: boolean = false,
  ) {
    try {
      const result = await this.ht_ThongbaoService.createDataTest();

      return ApiResponse.success('Add thong bao success!', result);
    } catch (ex) {
      return ApiResponse.error('Add thong bao failed!', 500, ex.message);
    }
  }

  @Post('read')
  async readThongBao(@Body('id') id: number) {
    try {
      const result = await this.ht_ThongbaoService.update(
        { id },
        {
          readed: true,
        },
      );

      return ApiResponse.success('Update thong bao success!', result);
    } catch (ex) {
      return ApiResponse.error('Update thong bao failed!', 500, ex.message);
    }
  }

  @Post('unread')
  async unreadThongBao(@Body('id') id: number) {
    try {
      const result = await this.ht_ThongbaoService.update(
        { id },
        {
          readed: false,
        },
      );

      return ApiResponse.success('Update thong bao success!', result);
    } catch (ex) {
      return ApiResponse.error('Update thong bao failed!', 500, ex.message);
    }
  }
}
