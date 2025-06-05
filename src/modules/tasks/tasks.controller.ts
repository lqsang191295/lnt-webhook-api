import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Public } from '../../common/decorators/public.decorator';
import { ApiResponse } from '../../common/api/api-response';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly tasksService: TasksService) {}

  @Public()
  @Get('all')
  getAllJobs() {
    try {
      const jobs = this.tasksService.getAllCronJobs();

      return ApiResponse.success('Get all cron jobs success!', jobs);
    } catch (ex) {
      return ApiResponse.error('Get all cron jobs failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('start')
  startJobById(@Body('name') name: string) {
    try {
      const result = this.tasksService.startJobById(name);

      return ApiResponse.success('Start cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Start cron jobs failed!', 500, ex.message);
    }
  }

  @Public()
  @Post('stop')
  stopJobById(@Body('name') name: string) {
    try {
      const result = this.tasksService.stopJobById(name);

      return ApiResponse.success('Stop cron jobs success!', result);
    } catch (ex) {
      return ApiResponse.error('Stop cron jobs failed!', 500, ex.message);
    }
  }
}
