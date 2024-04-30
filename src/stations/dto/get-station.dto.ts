import { IsNumber, IsString } from 'class-validator';
import { Station } from '../entities/station.entity';

export class GetStationDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  lon: number;

  @IsNumber()
  lat: number;

  static fromEntityArray(entites: Station[]): GetStationDto[] {
    return entites.map((entity) => this.fromEntity(entity));
  }

  static fromEntity(entity: Station): GetStationDto {
    return {
      id: entity.id,
      name: entity.name,
      lon: entity.lon,
      lat: entity.lat,
    };
  }
}
