import { Global, Module } from '@nestjs/common';
import { PasswordHashService } from './services/password-hash.service';

@Global()
@Module({
  providers: [PasswordHashService],
  exports: [PasswordHashService],
})
export class SharedModule {}
