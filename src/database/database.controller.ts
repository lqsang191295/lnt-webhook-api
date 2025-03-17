import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('users')
  async getUsers() {
    return this.databaseService.getAllUsers();
  }

  @Post('users')
  async addUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.databaseService.createUser(name, email, password);
  }

  @Get('token')
  async getToken() {
    const data = await this.databaseService.getToken();

    if (!data || data.length === 0) {
      return;
    }

    return {
      accessToken: data[0].Thamso,
      refreshToken: data[1].Thamso,
    };
  }

  @Post('update-token')
  async updateToken(
    @Body('access_token') access_token: string,
    @Body('refresh_token') refresh_token: string,
  ) {
    return this.databaseService.saveToken(access_token, refresh_token);
  }
}
