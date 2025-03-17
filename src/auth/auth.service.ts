import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    if (!username || !password) throw new UnauthorizedException();

    const user = await this.usersService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.userId };

    return await this.jwtService.signAsync(payload);
  }
}
