import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AD_UserLoggedService } from './AD_UserLogged.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/AD_UserLogged')
export class AD_UserLoggedController {
  private readonly logger = new Logger(AD_UserLoggedController.name);

  constructor(private readonly ad_UserLoggedService: AD_UserLoggedService) {}

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
  async setMainDevice(@Body('TokenDevice') TokenDevice: string) {
    try {
      const result = await this.ad_UserLoggedService.update(
        {
          TokenDevice: TokenDevice,
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
}
