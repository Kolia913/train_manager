import { Global, Module } from '@nestjs/common';
import { PasswordHashService } from './services/password-hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '2 days' },
        };
      },
    }),
  ],
  providers: [PasswordHashService],
  exports: [PasswordHashService, JwtModule],
})
export class SharedModule {}
