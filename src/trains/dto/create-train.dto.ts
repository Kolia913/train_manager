import { IsString } from 'class-validator';
import { CreateWagonDto } from './create-wagon.dto';

export class CreateTrainDto {
  @IsString()
  number: string;

  @IsString()
  type: string;

  @IsString()
  class: string;

  wagon: CreateWagonDto;
}
