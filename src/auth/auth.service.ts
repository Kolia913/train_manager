import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordHashService } from 'src/shared/services/password-hash.service';
import { GetUserDto } from 'src/users/dto/get-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHashService: PasswordHashService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    phone: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user: GetUserDto = await this.usersService.findByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid creadentials');
    }
    const [salt, storedHash] = user.password.split('.');
    const receivedPasswordHash = (
      await this.passwordHashService.getPasswordHash(password, salt)
    ).toString('hex');
    if (storedHash !== receivedPasswordHash) {
      throw new UnauthorizedException('Invalid creadentials');
    }

    const payload = {
      sub: user.id,
      phone: user.phone,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
