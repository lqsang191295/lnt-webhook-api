import * as crypto from 'crypto';

class HISCrypto {
  private static readonly mKey: Buffer = Buffer.from([
    200, 133, 186, 233, 155, 221, 87, 16, 2, 156, 70, 139, 118, 211, 153, 227,
    196, 120, 170, 63, 199, 36, 20, 220, 91, 96, 231, 117, 177, 213, 95, 183,
  ]);
  private static readonly mIV: Buffer = Buffer.from([
    2, 156, 70, 139, 118, 211, 153, 227, 119, 73, 59, 171, 64, 37, 71, 41,
  ]);

  public static decrypt(encryptedText: string): string {
    try {
      // Convert base64 to buffer
      const encryptedBuffer: Buffer = Buffer.from(encryptedText, 'base64');

      // Create decipher with AES-256-CBC (Rijndael)
      const decipher: crypto.Decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        this.mKey,
        this.mIV,
      );

      // Decrypt
      let decrypted: Buffer = decipher.update(encryptedBuffer);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString('utf8');
    } catch (error) {
      console.error('Decrypt error:', error);
      return encryptedText;
    }
  }

  public static encrypt(plainText: string): string {
    try {
      // Create cipher with AES-256-CBC (Rijndael)
      const cipher: crypto.Cipher = crypto.createCipheriv(
        'aes-256-cbc',
        this.mKey,
        this.mIV,
      );

      // Encrypt
      let encrypted: Buffer = cipher.update(plainText, 'utf8');
      encrypted = Buffer.concat([encrypted, cipher.final()]);

      return encrypted.toString('base64');
    } catch (error) {
      console.error('Encrypt error:', error);
      return plainText;
    }
  }
}

export default HISCrypto;
