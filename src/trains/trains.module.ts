import { forwardRef, Module } from '@nestjs/common';
import { TrainsService } from './trains.service';
import { TrainsController } from './trains.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';
import { Wagon } from './entities/wagon.entity';
import { Seat } from './entities/seat.entity';
import { RoutesModule } from 'src/routes/routes.module';
import { AdditionalServicesModule } from 'src/additional_services/additional_services.module';
import { RoutePart } from 'src/routes/entities/route-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Train, Wagon, Seat, RoutePart]),
    forwardRef(() => RoutesModule),
    AdditionalServicesModule,
  ],
  controllers: [TrainsController],
  providers: [TrainsService],
})
export class TrainsModule {}
