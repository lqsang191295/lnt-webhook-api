import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../common/repository/base.repository';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AD_UserLoggedEntity } from './AD_UserLogged.entity';
import { AD_UserLoggedDto } from './AD_UserLogged.dto';

@Injectable()
export class AD_UserLoggedService extends BaseRepository<AD_UserLoggedEntity> {
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(dataSource, AD_UserLoggedEntity);
  }

  async findOne(username: string): Promise<AD_UserLoggedDto | null> {
    const data = await this.findById([{ UserID: username }]);

    if (!data) return null;

    return data[0];
  }

  async findMainDeviceByUsername(
    username: string,
  ): Promise<AD_UserLoggedDto | null> {
    const data = await this.findById([
      { UserID: username },
      { IsMainDevice: true },
      { Accepted: false },
    ]);

    console.log('data === ', data);

    if (!data) return null;

    return data[0];
  }
}
