import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base.repository';
import { HT_ThamSoEntity } from './HT_ThamSo.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { HT_ThamSoDto } from './HT_Thamso.dto';

@Injectable()
export class HT_ThamsoService extends BaseRepository<HT_ThamSoEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, HT_ThamSoEntity);
  }

  createDataTest() {
    const htDto = new HT_ThamSoDto();

    htDto.Ma = 'test1';
    htDto.Thamso = 'test1';
    htDto.Diengiai = 'test12';

    return this.create(htDto);
  }

  updateDataTest() {
    const htDto = new HT_ThamSoDto();

    htDto.Ma = 'test1';
    htDto.Thamso = 'test131121222';
    htDto.Diengiai = 'test11231231231232222';

    return this.update({ Ma: htDto.Ma }, htDto);
  }

  async saveToken(accessToken: string, refreshToken: string) {
    const accessTokenData = await this.update(
      { Ma: 'AccessToken_Zalo' },
      {
        Thamso: accessToken,
      },
    );

    const refreshTokenData = await this.update(
      { Ma: 'RefreshToken_Zalo' },
      {
        Thamso: refreshToken,
      },
    );

    return {
      accessTokenData,
      refreshTokenData,
    };
  }
}
