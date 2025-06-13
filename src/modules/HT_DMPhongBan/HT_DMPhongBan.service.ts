import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { HT_DMPhongBanEntity } from './HT_DMPhongBan.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class HT_DMPhongBanService extends BaseRepository<HT_DMPhongBanEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_DMPhongBanEntity);
  }

}
