import { IsNumber } from 'class-validator';

export class PartialWagonRoutePartDto {
  @IsNumber()
  segment_id: number;

  @IsNumber()
  departure_time_minutes: number;

  @IsNumber()
  arrival_time_minutes: number;

  @IsNumber()
  price: number;

  @IsNumber()
  order: number;
}
