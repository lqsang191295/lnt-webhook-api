import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Ispublich ', isPublic);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    let token = this.extractTokenFromHeader(request);
    const cookies = request.cookies;

    console.log('aaaaaaaaaaa ', cookies);

    if (!token) {
      if (cookies) token = cookies.jwt;
    }

    console.log('token === ', token);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const JWT_SECRET = this.configService.get<string>('JWT_SECRET');
      const JWT_EXPIRESIN = this.configService.get<string>('JWT_EXPIRESIN');

      console.log('JWT_EXPIRESIN 1111 ========== ', JWT_EXPIRESIN, JWT_SECRET);

      const payload = await this.jwtService.signAsync(
        { token },
        {
          secret: JWT_SECRET,
          expiresIn: JWT_EXPIRESIN,
        },
      );

      request['user'] = payload;
    } catch (ex) {
      console.log('exxx ', ex);
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
