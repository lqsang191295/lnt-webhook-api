import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AD_UserLoggedService } from './AD_UserLogged.service';
import { ApiResponse } from 'src/common/api/api-response';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('module/AD_UserLogged')
export class AD_UserLoggedController {
  private readonly logger = new Logger(AD_UserLoggedController.name);

  constructor(private readonly ad_UserLoggedService: AD_UserLoggedService) {}

  @Public()
  @Post('add')
  async addUserlogged(
    @Body('UserID') UserID: string,
    @Body('Device') Device: string,
    @Body('TokenDevice') TokenDevice: string,
  ) {
    try {
      const result = await this.ad_UserLoggedService.create({
        UserID,
        Device,
        TokenDevice,
        create_at: new Date(),
      });

      return ApiResponse.success('Add user logged success!', result);
    } catch (ex) {
      return ApiResponse.error('Add user logged failed!', 500, ex.message);
    }
  }

  @Post('set-main-device')
  async setMainDevice(
    @Body('TokenDevice') TokenDevice: string,
    @Body('UserID') UserID: string,
  ) {
    try {
      const result = await this.ad_UserLoggedService.update(
        {
          TokenDevice: TokenDevice,
          UserID: UserID,
        },
        {
          IsMainDevice: true,
        },
      );

      return ApiResponse.success('Add user logged success!', result);
    } catch (ex) {
      return ApiResponse.error('Add user logged failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('get-by-id')
  async getById(
    @Body('TokenDevice') TokenDevice: string,
    @Body('UserID') UserID: string,
  ) {
    try {
      const result = await this.ad_UserLoggedService.findById([
        {
          TokenDevice: TokenDevice,
        },
        { UserID: UserID },
      ]);

      if (!result) {
        return ApiResponse.error('Get device logged failed!', 500, 'No data');
      }

      return ApiResponse.success('Get device logged success!', result[0]);
    } catch (ex) {
      return ApiResponse.error('Get device logged failed!', 500, ex.message);
    }
  }
}
