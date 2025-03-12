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
}
