import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PassengerModule } from './passenger/passenger.module';
import { StationsModule } from './stations/stations.module';
import { RoutesModule } from './routes/routes.module';
import { TrainsModule } from './trains/trains.module';
import { FaresModule } from './fares/fares.module';
import { AdditionalServicesModule } from './additional_services/additional_services.module';
import { TicketsModule } from './tickets/tickets.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_DATABASE'),
          entities: [],
          synchronize: process.env.NODE_ENV !== 'production',
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    PassengerModule,
    StationsModule,
    RoutesModule,
    TrainsModule,
    FaresModule,
    AdditionalServicesModule,
    TicketsModule,
  ],
})
export class AppModule {}
