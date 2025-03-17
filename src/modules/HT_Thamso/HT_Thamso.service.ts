import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base.repository';
import { HT_ThamSo } from './HT_ThamSo.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HT_ThamSoDto } from './HT_Thamso.dto';

@Injectable()
export class HT_ThamsoService extends BaseRepository<HT_ThamSo> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_ThamSo);
  }

  createDataTest() {
    const htDto = new HT_ThamSoDto();

    htDto.Ma = 'test1';
    htDto.Thamso = 'test1';
    htDto.Diengiai = 'test1';

    return this.create(htDto);
  }

  updateDataTest() {
    const htDto = new HT_ThamSoDto();

    htDto.Ma = 'test1';
    htDto.Thamso = 'test12222';
    htDto.Diengiai = 'test12222';

    return this.update(htDto.Ma, htDto);
  }

  async saveToken(accessToken: string, refreshToken: string) {
    const accessTokenData = await this.update('AccessToken_Zalo', {
      Thamso: accessToken,
    });

    const refreshTokenData = await this.update('RefreshToken_Zalo', {
      Thamso: refreshToken,
    });

    return {
      accessTokenData,
      refreshTokenData,
    };
  }
}
