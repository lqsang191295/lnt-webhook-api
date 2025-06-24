import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_GiayKhamSucKhoeEntity } from './BV_GiayKhamSucKhoe.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_GiayKhamSucKhoeService extends BaseRepository<BV_GiayKhamSucKhoeEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_GiayKhamSucKhoeEntity);
  }

}
