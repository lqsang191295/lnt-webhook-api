import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('pkce')
  generatePKCE() {
    const codeVerifier = this.authService.generateCodeVerifier();
    const codeChallenge = this.authService.generateCodeChallenge(codeVerifier);

    return {
      code_verifier: codeVerifier,
      code_challenge: codeChallenge,
      method: 'S256', // OAuth PKCE uses 'S256' method
    };
  }
}
