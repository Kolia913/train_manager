import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class PublicUserDto {
  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  static fromEntity(user: User): PublicUserDto {
    return {
      email: user.email,
      phone: user.phone,
      name: user.name,
    };
  }
}
