import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class HelperService {
  public generateCodeVerifier(): string {
    return crypto.randomBytes(64).toString('hex'); // Random 64 bytes -> Hex
  }

  public generateCodeChallenge(codeVerifier: string): string {
    const hash = crypto.createHash('sha256').update(codeVerifier).digest();
    return this.base64UrlEncode(hash);
  }

  private base64UrlEncode(buffer: Buffer): string {
    return buffer
      .toString('base64')
      .replace(/\+/g, '-') // Convert "+" to "-".
      .replace(/\//g, '_') // Convert "/" to "_".
      .replace(/=+$/, ''); // Remove "=" padding.
  }
}
