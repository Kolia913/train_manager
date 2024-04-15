import { Fare } from 'src/fares/entities/fare.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Seat } from 'src/trains/entities/seat.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketsServices } from './tickets-services.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Passenger, (passenger: Passenger) => passenger.tickets, {
    onDelete: 'CASCADE',
  })
  passenger: Passenger;

  @ManyToOne(() => Seat, {
    onDelete: 'SET NULL',
  })
  seat: Seat;

  @ManyToOne(() => Fare, {
    onDelete: 'SET NULL',
  })
  fare: Fare;

  @OneToMany(
    () => TicketsServices,
    (ticketsServices: TicketsServices) => ticketsServices.ticket,
    {
      onDelete: 'SET NULL',
    },
  )
  services: TicketsServices[];

  @ManyToMany(() => RoutePart, {
    onDelete: 'SET NULL',
  })
  @JoinTable({ name: 'ticket_route' })
  routeParts: RoutePart[];

  @Column('float')
  price: number;

  @Column('float')
  priceWithDiscount: number;

  @Column('timestamp')
  purchaseTimestamp: string;

  @Column('timestamp', {
    nullable: true,
  })
  usageTimestamp: string;
}
