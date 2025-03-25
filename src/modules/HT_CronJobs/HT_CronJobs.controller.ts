import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { HT_CronJobsService } from './HT_CronJobs.service';
import { ApiResponse } from 'src/common/api/api-response';

@Controller('module/HT_CronJobs')
export class HT_CronJobsController {
  constructor(private readonly ht_CronJobsService: HT_CronJobsService) {}

  @Public()
  @Get('all')
  async getAllCronJobs() {
    try {
      const result = await this.ht_CronJobsService.findAll();

      return ApiResponse.success('Get cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Get cron jobs failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('add')
  async addCronJob(
    @Body('name') name: string,
    @Body('func') func: string,
    @Body('time') time: string,
    @Body('status') status: boolean = false,
  ) {
    try {
      const result = await this.ht_CronJobsService.create({
        name,
        func,
        time,
        status,
        updated_at: new Date(),
      });

      return ApiResponse.success('Add cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Add cron jobs failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('update')
  async updateCronJob(
    @Body('name') name: string,
    @Body('func') func: string,
    @Body('time') time: string,
    @Body('status') status: boolean = false,
  ) {
    try {
      const result = await this.ht_CronJobsService.update(
        { name },
        {
          func,
          time,
          status,
        },
      );

      return ApiResponse.success('Update cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Update cron jobs failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('delete')
  async deleteCronJob(@Body('name') name: string) {
    try {
      const result = await this.ht_CronJobsService.delete({ name });

      return ApiResponse.success('Delete cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Delete cron jobs failed!', 500, ex.message);
    }
  }
}
