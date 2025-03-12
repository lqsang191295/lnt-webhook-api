import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async rawQuery(query: string, params: any[] = []) {
    return this.dataSource.query(query, params);
  }

  async getAllUsers() {
    return this.rawQuery('SELECT TOP(10) * FROM BV_Master');
  }

  async createUser(name: string, email: string, password: string) {
    return this.rawQuery(
      'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
    );
  }

  async getToken() {
    return this.rawQuery(
      `SELECT Thamso FROM HT_ThamSo WHERE Ma = 'AccessToken_Zalo' OR Ma = 'RefreshToken_Zalo'`,
    );
  }

  async saveToken(accessToken: string, refreshToken: string) {
    const accessTokenData = await this.rawQuery(
      `UPDATE HT_ThamSo SET Thamso = '${accessToken}' WHERE Ma = 'AccessToken_Zalo'`,
    );

    const refreshTokenData = await this.rawQuery(
      `UPDATE HT_ThamSo SET Thamso = '${refreshToken}' WHERE Ma = 'RefreshToken_Zalo'`,
    );

    return {
      accessTokenData,
      refreshTokenData,
    };
  }
}
