import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { pbkdf2 as _pbkdf2, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
const pbkdf2 = promisify(_pbkdf2);

@Injectable()
export class PasswordHashService {
  constructor(private readonly configService: ConfigService) {}

  async getSaltedPasswordHash(password: string) {
    const salt = randomBytes(
      +this.configService.get<number>('SALT_BYTES_LEN'),
    ).toString('hex');
    const hash = await this.getPasswordHash(password, salt);
    return salt + '.' + hash.toString('hex');
  }

  async getPasswordHash(password: string, salt: string) {
    const hash = (await pbkdf2(
      password,
      salt,
      +this.configService.get<number>('HASH_ITERATIONS'),
      +this.configService.get<number>('HASH_KEY_LEN'),
      'sha512',
    )) as Buffer;
    return hash;
  }
}
