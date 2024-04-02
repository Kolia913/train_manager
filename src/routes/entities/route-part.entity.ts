import { Segment } from 'src/stations/entities/segment.entity';

import { Wagon } from 'src/trains/entities/wagon.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoutePart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Wagon, (wagon: Wagon) => wagon.routeParts, {
    onDelete: 'CASCADE',
  })
  wagon: Wagon;

  @ManyToOne(() => Segment, { eager: true, onDelete: 'CASCADE' })
  segment: Segment;

  // @ManyToMany(() => Ticket, (ticket: Ticket) => ticket.routeParts, {
  //   onDelete: 'CASCADE',
  // })
  // tickets: Ticket[];

  @Column('integer')
  departure_time_minutes: number;

  @Column('integer')
  arrival_time_minutes: number;

  @Column('integer')
  order: number;

  @Column('float')
  price: number;
}
