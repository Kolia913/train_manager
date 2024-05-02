import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wagon } from './entities/wagon.entity';
import { In, Repository } from 'typeorm';
import { Train } from './entities/train.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';
import { CreateTrainDto } from './dto/create-train.dto';
import { AdditionalService } from 'src/additional_services/entities/additional_service.entity';
import { Seat } from './entities/seat.entity';
import { CreateSeatsDto } from './dto/create-seats.dto';
import { CreateWagonDto } from './dto/create-wagon.dto';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Wagon)
    private readonly wagonRepository: Repository<Wagon>,
    @InjectRepository(Train)
    private readonly trainRepository: Repository<Train>,
    @InjectRepository(RoutePart)
    private readonly rtPartRepository: Repository<RoutePart>,
  ) {}
  async create(createTrainDto: CreateTrainDto) {
    if (!createTrainDto.wagon) {
      throw new UnprocessableEntityException(
        'You cant create train without at least 1 wagon!',
      );
    }
    if (!createTrainDto.wagon.route_parts) {
      throw new UnprocessableEntityException(
        'You have to specify route for first wagon in train',
      );
    }
    const train = await this.trainRepository.manager.transaction(
      'READ COMMITTED',
      async (transactionEntityManager) => {
        const newTrain = transactionEntityManager.create(Train, {
          ...createTrainDto,
          wagon: undefined,
          wagons: [],
        });
        const savedTrain = await transactionEntityManager.save(Train, newTrain);

        const services = await transactionEntityManager.find(
          AdditionalService,
          {
            where: {
              id: In(createTrainDto.wagon.additional_services_ids),
            },
          },
        );

        const newWagon = transactionEntityManager.create(Wagon, {
          type: createTrainDto.wagon.type,
          number: createTrainDto.wagon.number,
          rentalPrice: createTrainDto.wagon.rental_price,
          train: {
            id: savedTrain.id,
          },
          additionalServices: services,
          routeParts: [],
        });

        const savedWagon = await transactionEntityManager.save(Wagon, newWagon);

        const seats: Seat[] = [];
        for (const seat of CreateSeatsDto.createForWagon(
          savedWagon.id,
          createTrainDto.wagon.seats_count,
        )) {
          seats.push(transactionEntityManager.create(Seat, seat));
        }

        await transactionEntityManager.save(Seat, seats);

        const routeParts: RoutePart[] = [];
        for (const rtPart of createTrainDto.wagon.route_parts) {
          const newRtPart = transactionEntityManager.create(RoutePart, {
            arrivalTimeMinutes: rtPart.arrival_time_minutes,
            departureTimeMinutes: rtPart.departure_time_minutes,
            segment: {
              id: rtPart.segment_id,
            },
            price: rtPart.price,
            order: rtPart.order,
            wagon: {
              id: savedWagon.id,
            },
          });
          routeParts.push(newRtPart);
        }
        await transactionEntityManager.save(RoutePart, routeParts);

        const result = await transactionEntityManager.findOne(Train, {
          where: {
            id: savedTrain.id,
          },
          relations: {
            wagons: {
              routeParts: {
                segment: {
                  aStation: true,
                  dStation: true,
                },
              },
            },
          },
        });

        return result;
      },
    );

    return train;
  }

  async findAll() {
    const trains = await this.trainRepository.find();
    return trains;
  }
  async findOne(id: number) {
    const train = await this.trainRepository.findOne({
      where: { id },
      relations: {
        wagons: true,
      },
    });

    return train;
  }

  async findWagon(wagonId: number) {
    const wagon = await this.wagonRepository.findOne({
      where: {
        id: wagonId,
      },
      relations: {
        routeParts: true,
        seats: true,
        train: true,
      },
    });

    return wagon;
  }

  async update(id: number, crateWagonDto: CreateWagonDto) {
    const wagon = await this.wagonRepository.manager.transaction(
      'READ COMMITTED',
      async (transactionEntityManager) => {
        const services = await transactionEntityManager.find(
          AdditionalService,
          {
            where: {
              id: In(crateWagonDto.additional_services_ids),
            },
          },
        );

        const wagonsFromTrain = await transactionEntityManager.find(Wagon, {
          where: {
            train: {
              id,
            },
          },
          relations: {
            routeParts: true,
          },
        });

        const firstWagonFromTrain = wagonsFromTrain.find(
          (item) => item.routeParts.length,
        );

        const newWagon = transactionEntityManager.create(Wagon, {
          type: crateWagonDto.type,
          number: crateWagonDto.number,
          rentalPrice: crateWagonDto.rental_price,
          train: {
            id,
          },
          additionalServices: services,
        });

        const savedWagon = await transactionEntityManager.save(Wagon, newWagon);

        const newWagonRoute = firstWagonFromTrain.routeParts.map((item) =>
          transactionEntityManager.create(RoutePart, {
            ...item,
            wagon: {
              id: savedWagon.id,
            },
          }),
        );

        await transactionEntityManager.save(RoutePart, newWagonRoute);

        const seats: Seat[] = [];
        for (const seat of CreateSeatsDto.createForWagon(
          savedWagon.id,
          crateWagonDto.seats_count,
        )) {
          seats.push(transactionEntityManager.create(Seat, seat));
        }

        await transactionEntityManager.save(Seat, seats);

        const result = await transactionEntityManager.findOne(Wagon, {
          where: {
            id: savedWagon.id,
          },
          relations: {
            additionalServices: true,
            routeParts: true,
            train: true,
            seats: true,
          },
        });

        return result;
      },
    );

    return wagon;
  }

  async remove(wagonId: number) {
    await this.wagonRepository.manager.transaction(
      async (transactionEntityManager) => {
        const wagonSeats = await transactionEntityManager.find(Seat, {
          where: {
            wagon: {
              id: wagonId,
            },
          },
        });

        const seatsIds = wagonSeats.map((item) => item.id);
        const tickets = await transactionEntityManager.find(Ticket, {
          where: {
            seat: {
              id: In(seatsIds),
            },
          },
        });
        await transactionEntityManager.remove(Ticket, tickets);
        await transactionEntityManager.remove(Seat, wagonSeats);
        const wagonRouteParts = await transactionEntityManager.find(RoutePart, {
          where: {
            wagon: {
              id: wagonId,
            },
          },
        });

        await transactionEntityManager.remove(RoutePart, wagonRouteParts);

        const wagon = await transactionEntityManager.findOne(Wagon, {
          where: {
            id: wagonId,
          },
        });

        await transactionEntityManager.remove(Wagon, wagon);
      },
    );

    return {
      message: 'Wagon is successfully removed!',
    };
  }
}
