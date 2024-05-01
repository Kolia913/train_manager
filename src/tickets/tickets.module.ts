import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketsServices } from './entities/tickets-services.entity';
import { FaresModule } from 'src/fares/fares.module';
import { PassengerModule } from 'src/passenger/passenger.module';
import { TrainsModule } from 'src/trains/trains.module';
import { RoutesModule } from 'src/routes/routes.module';
import { ReturnedTicket } from './entities/returned-ticket.entity';
import { Seat } from 'src/trains/entities/seat.entity';
import { AdditionalServicesModule } from 'src/additional_services/additional_services.module';
import { Fare } from 'src/fares/entities/fare.entity';
import { AdditionalService } from 'src/additional_services/entities/additional_service.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ticket,
      TicketsServices,
      ReturnedTicket,
      Seat,
      Fare,
      AdditionalService,
      Passenger,
      RoutePart,
    ]),
    FaresModule,
    PassengerModule,
    TrainsModule,
    AdditionalServicesModule,
    forwardRef(() => RoutesModule),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
