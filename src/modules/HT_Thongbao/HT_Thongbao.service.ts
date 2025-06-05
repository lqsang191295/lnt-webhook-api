import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { HT_ThongbaoEntity } from './HT_Thongbao.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HT_ThongbaoDto } from './HT_Thongbao.dto';
import { dbChangeSubject } from 'src/event-stream';

@Injectable()
export class HT_ThongbaoService extends BaseRepository<HT_ThongbaoEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_ThongbaoEntity);
  }

  async createDataTest() {
    const htDto = new HT_ThongbaoDto();

    htDto.title = 'test1';
    htDto.description = 'test12';
    htDto.created_at = new Date();

    const result = await this.create(htDto);

    dbChangeSubject.next({ event: 'create', data: result });

    return result;
  }
}
