import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { BV_ToathuocEntity } from './BV_Toathuoc.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class BV_ToathuocService extends BaseRepository<BV_ToathuocEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, BV_ToathuocEntity);
  }

}
