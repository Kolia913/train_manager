import { GetStationDto } from 'src/stations/dto/get-station.dto';
import { RoutePart } from '../entities/route-part.entity';

export class RoutePartDto {
  id: number;
  departure_time_minutes: number;
  arrival_time_minutes: number;
  order: number;
  price: number;
  wagon_id?: number;
  segment: {
    id: number;
    distance: number;
    departure_station: {
      id: number;
      name: string;
      lon: number;
      lat: number;
    };
    arrival_station: {
      id: number;
      name: string;
      lon: number;
      lat: number;
    };
  };

  static fromRawDataArray(rawData: any[]): RoutePartDto[] {
    return rawData.map((data) => this.fromRawData(data));
  }

  static fromRawData(rawData: any): RoutePartDto {
    return {
      id: rawData.routePart_id,
      departure_time_minutes: rawData.routePart_departure_time_minutes,
      arrival_time_minutes: rawData.routePart_arrival_time_minutes,
      order: rawData.routePart_order,
      price: rawData.routePart_price,
      wagon_id: rawData.routePart_wagon_id,
      segment: {
        id: rawData.segment_id,
        distance: rawData.segment_distance,
        departure_station: {
          id: rawData.segment_d_station_id,
          name: rawData.departure_name,
          lon: rawData.departure_lon,
          lat: rawData.departure_lat,
        },
        arrival_station: {
          id: rawData.segment_a_station_id,
          name: rawData.arrival_name,
          lon: rawData.arrival_lon,
          lat: rawData.arrival_lat,
        },
      },
    };
  }

  static fromEntityArray(entities: RoutePart[]): RoutePartDto[] {
    return entities.map((entity) => RoutePartDto.fromEntity(entity));
  }

  static fromEntity(entity: RoutePart): RoutePartDto {
    return {
      id: entity.id,
      departure_time_minutes: entity.departureTimeMinutes,
      arrival_time_minutes: entity.arrivalTimeMinutes,
      order: entity.order,
      price: entity.price,
      wagon_id: entity.wagon?.id,
      segment: {
        id: entity.segment.id,
        distance: entity.segment.distance,
        arrival_station: GetStationDto.fromEntity(entity.segment.aStation),
        departure_station: GetStationDto.fromEntity(entity.segment.dStation),
      },
    };
  }
}
