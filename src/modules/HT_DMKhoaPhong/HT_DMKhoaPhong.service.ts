import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { HT_DMKhoaPhongEntity } from './HT_DMKhoaPhong.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class HT_DMKhoaPhongService extends BaseRepository<HT_DMKhoaPhongEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_DMKhoaPhongEntity);
  }

}
