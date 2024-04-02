import { forwardRef, Module } from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';
import { UsersModule } from 'src/users/users.module';
import { FaresModule } from 'src/fares/fares.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Passenger]),
    forwardRef(() => UsersModule),
    FaresModule,
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengerModule {}
