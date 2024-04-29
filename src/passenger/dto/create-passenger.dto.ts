import { IsDateString, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsDateString()
  birthDate: string;

  @IsNumber()
  fare_id: number;
}
