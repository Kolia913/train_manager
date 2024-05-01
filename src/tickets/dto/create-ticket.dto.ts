import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Ticket } from '../entities/ticket.entity';
import { Seat } from 'src/trains/entities/seat.entity';
import { Fare } from 'src/fares/entities/fare.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';
import { TicketsServices } from '../entities/tickets-services.entity';
import * as dayjs from 'dayjs';

export class CreateTicketDto {
  passenger_id: number;

  seat_id: number;

  fare_id: number;

  services_ids: number[];

  route_parts_ids: number[];

  static toEntity(
    passenger: Passenger,
    seat: Seat,
    fare: Fare,
    routeParts: RoutePart[],
    services: TicketsServices[],
  ): Partial<Ticket> {
    const routePrice = routeParts.reduce((acc, val) => (acc += val.price), 0);
    const servicesPrice = services.reduce(
      (acc, val) => (acc += val.additionalService.price),
      0,
    );
    const servicesPriceWithDiscount = services.reduce(
      (acc, val) => (acc += val.priceWithDiscount),
      0,
    );
    const routePriceWithDiscount =
      routePrice - routePrice * (fare.discount / 100);

    const price = (routePrice + servicesPrice).toFixed(2);
    const priceWithDiscount = (
      routePriceWithDiscount + servicesPriceWithDiscount
    ).toFixed(2);

    return {
      passenger,
      seat,
      fare,
      routeParts,
      purchaseTimestamp: dayjs().toISOString(),
      usageTimestamp: null,
      price: +price,
      priceWithDiscount: +priceWithDiscount,
    };
  }
}
