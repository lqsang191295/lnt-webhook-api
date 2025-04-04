import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HT_CronJobsEntity } from './HT_CronJobs.entity';

@Injectable()
export class HT_CronJobsService extends BaseRepository<HT_CronJobsEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_CronJobsEntity);
  }
}
