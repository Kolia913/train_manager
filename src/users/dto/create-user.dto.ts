import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
