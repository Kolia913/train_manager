import { IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class PublicUserDto {
  @IsNumber()
  id: number;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  static fromEntity(user: User): PublicUserDto {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      name: user.name,
    };
  }
}
