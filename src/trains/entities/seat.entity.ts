import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Wagon } from './wagon.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  number: string;

  @Column('varchar', { length: 255 })
  type: string;

  @ManyToOne(() => Wagon, (wagon: Wagon) => wagon.seats, {
    onDelete: 'CASCADE',
  })
  wagon: Wagon;
}
