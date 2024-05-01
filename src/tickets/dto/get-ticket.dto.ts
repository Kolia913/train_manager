import { GetServiceDto } from 'src/additional_services/dto/get-service.dto';
import { AdditionalService } from 'src/additional_services/entities/additional_service.entity';
import { GetFareDto } from 'src/fares/dto/get-fare.dto';
import { GetPassengerDto } from 'src/passenger/dto/get-passenger.dto';
import { RoutePartDto } from 'src/routes/dto/get-route.dto';
import { GetSeatDto } from 'src/trains/dto/get-seat.dto';
import { GetTrainDto } from 'src/trains/dto/get-train.dto';
import { PublicWagonDto } from 'src/trains/dto/public-wagon.dto';

export class GetTicketDto {
  id: number;
  price: number;
  price_with_discount: number;
  purchase_timestamp: string;
  usage_timestamp: string | null;
  passenger: GetPassengerDto;
  fare: GetFareDto;
  services: GetServiceDto[];
  routeParts: RoutePartDto[];
  wagon: PublicWagonDto;
  train: GetTrainDto;
  seat: GetSeatDto;

  static fromEntityArray(entities: any[]) {
    return entities.map((entity) => this.fromEntity(entity));
  }

  static fromEntity(entity: any): GetTicketDto {
    return {
      id: entity.id,
      price: entity.price,
      price_with_discount: entity.priceWithDiscount,
      purchase_timestamp: entity.purchaseTimestamp,
      usage_timestamp: entity.usageTimestamp,
      passenger: GetPassengerDto.fromEntity(entity.passenger),
      fare: GetFareDto.fromEntity(entity.fare),
      routeParts: RoutePartDto.fromEntityArray(entity.routeParts),
      services: GetServiceDto.fromEntityArray(
        entity.services.map(
          (service: { additionalService: AdditionalService }) =>
            service.additionalService,
        ),
      ),
      train: GetTrainDto.fromEntity(entity.seat.wagon.train),
      wagon: PublicWagonDto.fromEntity(entity.seat.wagon),
      seat: GetSeatDto.fromEntity(entity.seat),
    };
  }
}
