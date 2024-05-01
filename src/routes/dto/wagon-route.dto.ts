export class WagonRouteDto {
  wagonId: number;
  wagon: {
    id: number;
    number: string;
    type: string;
    rentalPrice: number;
    trainId: number;
  };
  departure: {
    id: number;
    departureTimeMinutes: number;
    arrivalTimeMinutes: number;
    order: number;
    price: number;
    segmentId: number;
  };
  arrival: {
    id: number;
    departureTimeMinutes: number;
    arrivalTimeMinutes: number;
    order: number;
    price: number;
    segmentId: number;
  };

  static fromRawDataArray(rawData: any[]): WagonRouteDto[] {
    return rawData.map((data) => this.fromRawData(data));
  }

  static fromRawData(entity: any): WagonRouteDto {
    return {
      wagonId: entity.wagon_id,
      wagon: {
        id: entity.departure.wagon_id,
        number: entity.departure.wagon_number,
        type: entity.departure.wagon_type,
        rentalPrice: entity.departure.wagon_rental_price,
        trainId: entity.departure.wagon_train_id,
      },
      departure: {
        id: entity.departure.rp_id,
        departureTimeMinutes: entity.departure.rp_departure_time_minutes,
        arrivalTimeMinutes: entity.departure.rp_arrival_time_minutes,
        order: entity.departure.rp_order,
        price: entity.departure.rp_price,
        segmentId: entity.departure.rp_segment_id,
      },
      arrival: {
        id: entity.arrival.rp_id,
        departureTimeMinutes: entity.arrival.rp_departure_time_minutes,
        arrivalTimeMinutes: entity.arrival.rp_arrival_time_minutes,
        order: entity.arrival.rp_order,
        price: entity.arrival.rp_price,
        segmentId: entity.arrival.rp_segment_id,
      },
    };
  }
}
