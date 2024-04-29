import { IsEmail, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  password: string;
}
