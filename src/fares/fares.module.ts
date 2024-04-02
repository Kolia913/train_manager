import { Module } from '@nestjs/common';
import { FaresService } from './fares.service';
import { FaresController } from './fares.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fare } from './entities/fare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fare])],
  controllers: [FaresController],
  providers: [FaresService],
})
export class FaresModule {}
