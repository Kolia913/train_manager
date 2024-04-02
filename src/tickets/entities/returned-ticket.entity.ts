import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class ReturnedTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Ticket, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  ticket: Ticket;

  @Column('float')
  refundAmount: number;

  @Column('date')
  returnDate: string;
}
