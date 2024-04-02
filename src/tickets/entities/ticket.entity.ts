import { Fare } from 'src/fares/entities/fare.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Seat } from 'src/trains/entities/seat.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @OneToOne(() => Seat, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  seat: Seat;

  @OneToOne(() => Fare, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  fare: Fare;

  @OneToMany(
    () => TicketsServices,
    (ticketsServices: TicketsServices) => ticketsServices.ticket,
    {
      onDelete: 'SET NULL',
    },
  )
  services: TicketsServices[];

  @ManyToMany(() => RoutePart, (routePart: RoutePart) => routePart.tickets, {
    onDelete: 'SET NULL',
  })
  routeParts: RoutePart[];

  @Column('float')
  price: number;

  @Column('float')
  priceWithDiscount: number;

  @Column('timestamptz')
  purchaseTimestamp: string;

  @Column('timestamptz', {
    nullable: true,
  })
  usageTimestamp: string;
}
