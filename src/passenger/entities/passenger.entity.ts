import { Fare } from 'src/fares/entities/fare.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Fare, {
    onDelete: 'SET NULL',
  })
  fare: Fare;

  @ManyToOne(() => User, (user: User) => user.passengers, {
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Ticket, (ticket: Ticket) => ticket.passenger)
  tickets: Ticket[];

  @Column('varchar', { length: 100 })
  firstName: string;

  @Column('varchar', { length: 100 })
  lastName: string;

  @Column('date')
  birthDate: string;
}
