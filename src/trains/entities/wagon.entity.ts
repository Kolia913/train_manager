import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Train } from './train.entity';
import { Seat } from './seat.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';
import { AdditionalService } from 'src/additional_services/entities/additional_service.entity';

@Entity()
export class Wagon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  number: string;

  @Column('varchar', { length: 255 })
  type: string;

  @Column('float')
  rental_price: number;

  @ManyToOne(() => Train, (train: Train) => train.wagons, {
    onDelete: 'CASCADE',
  })
  train: Train;

  @OneToMany(() => Seat, (seat: Seat) => seat.wagon)
  seats: Seat[];

  @OneToMany(() => RoutePart, (routePart: RoutePart) => routePart.wagon)
  routeParts: RoutePart[];

  @ManyToMany(() => AdditionalService, {
    onDelete: 'SET NULL',
  })
  @JoinTable({ name: 'wagons_services' })
  additionalServices: AdditionalService[];
}
