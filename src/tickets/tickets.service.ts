import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Seat } from 'src/trains/entities/seat.entity';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTicketDto } from './dto/get-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}
  // create(createTicketDto: CreateTicketDto) {
  //   return 'This action adds a new ticket';
  // }

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
