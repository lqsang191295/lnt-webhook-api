import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_QLyCapTheEntity } from './BV_QLyCapThe.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_QLyCapTheService extends BaseRepository<BV_QLyCapTheEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_QLyCapTheEntity);
  }

}
