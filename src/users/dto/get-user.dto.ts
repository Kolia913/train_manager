import { IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class GetUserDto {
  @IsNumber()
  id: number;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  static fromEntity(user: User): GetUserDto {
    return {
      id: user.id,
      phone: user.phone,
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }
}
