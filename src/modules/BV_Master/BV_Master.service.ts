import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_MasterEntity } from './BV_Master.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_MasterService extends BaseRepository<BV_MasterEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_MasterEntity);
  }
}
