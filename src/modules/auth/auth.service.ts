import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AD_UserAccountService } from '../AD_UserAccount/AD_UserAccount.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly ad_UserAccountService: AD_UserAccountService,
  ) {}

  async signIn(username: string, password: string) {
    if (!username || !password) throw new UnauthorizedException();

    const user = await this.ad_UserAccountService.findOne(username);

    console.log('user === ', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.Password !== password) {
      throw new UnauthorizedException();
    }

    const payload = {
      username: user.UserID,
      userId: user.UserID,
      roles: user.Description,
      empId: user.EmpID,
    };

    return await this.jwtService.signAsync(payload);
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET, // secret dùng để sign token lúc tạo
      });
      return payload; // Trả về thông tin trong token nếu hợp lệ
    } catch (error) {
      console.error('Invalid token:', error);
      return null; // Token invalid hoặc expired
    }
  }
}
