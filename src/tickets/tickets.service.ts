import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Seat } from 'src/trains/entities/seat.entity';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketDto } from './dto/get-ticket.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Fare } from 'src/fares/entities/fare.entity';
import { TicketsServices } from './entities/tickets-services.entity';
import { AdditionalService } from 'src/additional_services/entities/additional_service.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Fare)
    private readonly fareRepository: Repository<Fare>,
    @InjectRepository(TicketsServices)
    private readonly ticketsServicesRepository: Repository<TicketsServices>,
    @InjectRepository(AdditionalService)
    private readonly serviceRepository: Repository<AdditionalService>,
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
    @InjectRepository(RoutePart)
    private readonly rtPartRepository: Repository<RoutePart>,
  ) {}
  async create(userId: number, createTicketDto: CreateTicketDto) {
    const isSeatBooked = await this.ticketRepository.exists({
      where: { seat: { id: createTicketDto.seat_id } },
    });
    if (isSeatBooked) {
      throw new BadRequestException(
        'This seat has been already taken by someone else!',
      );
    }
    const seat = await this.seatRepository.findOne({
      where: { id: createTicketDto.seat_id },
    });
    const passenger = await this.passengerRepository.findOne({
      where: {
        id: createTicketDto.passenger_id,
        user: { id: userId },
      },
    });
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }
    const routeParts = await this.rtPartRepository.find({
      where: {
        id: In(createTicketDto.route_parts_ids),
      },
    });
    const fare = await this.fareRepository.findOne({
      where: { id: createTicketDto.fare_id },
    });

    const additionalServices = await this.serviceRepository.find({
      where: {
        id: In(createTicketDto.services_ids),
      },
    });
    const ticketEntity = this.ticketRepository.create();
    ticketEntity.fare = fare;
    ticketEntity.passenger = passenger;
    ticketEntity.seat = seat;
    ticketEntity.routeParts = routeParts;
    ticketEntity.price = 0;
    ticketEntity.purchaseTimestamp = dayjs().toISOString();
    ticketEntity.services = [];
    ticketEntity.priceWithDiscount = 0;

    const createdTicket = await this.ticketRepository.manager.transaction(
      async (transactionEntityManager) => {
        const ticket = await transactionEntityManager.save(ticketEntity);

        const ticketServices: TicketsServices[] = additionalServices.map(
          (item) => {
            return transactionEntityManager.create(TicketsServices, {
              ticketId: ticket.id,
              additionalServiceId: item.id,
              additionalService: item,
              saleTimestamp: dayjs().toISOString(),
              priceWithDiscount: +(
                item.price -
                item.price * (fare.discount / 100)
              ).toFixed(2),
            });
          },
        );

        await transactionEntityManager.save(TicketsServices, ticketServices);

        const savedTicketServices = await transactionEntityManager.find(
          TicketsServices,
          {
            where: {
              ticketId: ticket.id,
            },
            relations: {
              additionalService: true,
            },
          },
        );

        const ticketToUpdate = transactionEntityManager.create(Ticket, {
          id: ticket.id,
          ...CreateTicketDto.toEntity(
            ticket.passenger,
            ticket.seat,
            ticket.fare,
            ticket.routeParts,
            savedTicketServices,
          ),
        });

        const updatedTicket = await transactionEntityManager.save(
          Ticket,
          ticketToUpdate,
          {
            reload: true,
          },
        );
        const transactionResult = await transactionEntityManager.findOne(
          Ticket,
          {
            where: {
              id: updatedTicket.id,
            },
            relations: {
              fare: true,
              services: true,
              routeParts: true,
              seat: true,
              passenger: true,
            },
          },
        );
        return transactionResult;
      },
    );

    return createdTicket;
  }

  async findAll(userId: number) {
    const tickets = await this.ticketRepository.find({
      where: {
        passenger: {
          user: {
            id: userId,
          },
        },
      },
      order: {
        purchaseTimestamp: 'DESC',
      },
      relations: {
        passenger: true,
        fare: true,
        services: {
          additionalService: true,
          ticket: false,
        },
        routeParts: {
          segment: {
            aStation: true,
            dStation: true,
          },
        },
        seat: {
          wagon: {
            train: true,
          },
        },
      },
    });

    return GetTicketDto.fromEntityArray(tickets);
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  // update(id: number, updateTicketDto: UpdateTicketDto) {
  //   return `This action updates a #${id} ticket`;
  // }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }

  async findAllSeats(wagonId: number) {
    const allSeats = await this.seatRepository.find({
      where: { wagon: { id: wagonId } },
    });

    const subQuery = this.ticketRepository
      .createQueryBuilder('ticket')
      .select('ticket.seat_id')
      .where('ticket.seat_id = seat.id');

    const query = this.seatRepository
      .createQueryBuilder('seat')
      .where('seat.wagon_id = :wagonId', { wagonId })
      .andWhere(`seat.id NOT IN (${subQuery.getQuery()})`);

    const availableSeats = await query.getMany();

    const markedSeats = allSeats.map((item) => {
      const availableSeat = availableSeats.find((as) => as.id === item.id);
      if (availableSeat) {
        return {
          ...item,
          isFree: true,
        };
      } else {
        return {
          ...item,
          isFree: false,
        };
      }
    });

    return markedSeats;
  }
}
