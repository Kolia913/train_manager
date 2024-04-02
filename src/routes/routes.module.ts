import { forwardRef, Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from 'src/stations/stations.module';
import { TrainsModule } from 'src/trains/trains.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { RoutePart } from './entities/route-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutePart]),
    forwardRef(() => TrainsModule),
    StationsModule,
    TicketsModule,
  ],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
