import { forwardRef, Module } from '@nestjs/common';
import { AdditionalServicesService } from './additional_services.service';
import { AdditionalServicesController } from './additional_services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional_service.entity';
import { TrainsModule } from 'src/trains/trains.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdditionalService]),
    forwardRef(() => TrainsModule),
  ],
  controllers: [AdditionalServicesController],
  providers: [AdditionalServicesService],
})
export class AdditionalServicesModule {}
