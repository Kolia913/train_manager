import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { PartialWagonRoutePartDto } from './partial-wagon-rt-part.dto';

export class CreateWagonDto {
  @IsString()
  number: string;

  @IsString()
  type: string;

  @IsNumber()
  rental_price: number;

  @IsNumber()
  seats_count: number;

  @IsArray()
  @IsOptional()
  route_parts: PartialWagonRoutePartDto[];

  @IsArray()
  @IsOptional()
  additional_services_ids?: number[];
}
