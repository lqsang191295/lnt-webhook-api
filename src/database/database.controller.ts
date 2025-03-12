import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('database')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get('users')
  async getUsers() {
    console.log('1111');
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
}
