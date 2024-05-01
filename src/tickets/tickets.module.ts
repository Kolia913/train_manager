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

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketsServices, ReturnedTicket, Seat]),
    FaresModule,
    PassengerModule,
    TrainsModule,
    forwardRef(() => RoutesModule),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
