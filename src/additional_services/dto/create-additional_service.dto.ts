import { IsNumber, IsString } from 'class-validator';

export class CreateAdditionalServiceDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;
}
