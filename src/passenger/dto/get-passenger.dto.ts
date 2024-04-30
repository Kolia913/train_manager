import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { GetFareDto } from 'src/fares/dto/get-fare.dto';
import { PublicUserDto } from 'src/users/dto/public-user.dto';
import { Passenger } from '../entities/passenger.entity';
import * as dayjs from 'dayjs';

export class GetPassengerDto {
  @IsNumber()
  id: number;

  @IsString()
  @MaxLength(100)
  firstName: string;

  @IsString()
  @MaxLength(100)
  lastName: string;

  @IsString()
  @Matches(/\^(0[1-9]|[1-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.\d{4}$/)
  birthDate: string;

  @IsNumber()
  @IsOptional()
  fare_id: number;

  @IsNumber()
  user_id: number;

  user: PublicUserDto;

  fare: GetFareDto;
  static fromEntityArray(entities: Passenger[]): GetPassengerDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
  static fromEntity(entity: Passenger): GetPassengerDto {
    return {
      id: entity.id,
      user_id: entity?.user.id,
      fare_id: entity?.fare.id,
      fare: GetFareDto.fromEntity(entity.fare),
      user: PublicUserDto.fromEntity(entity.user),
      birthDate: dayjs(entity.birthDate).format('DD.MM.YYYY'),
      firstName: entity.firstName,
      lastName: entity.lastName,
    };
  }
}
