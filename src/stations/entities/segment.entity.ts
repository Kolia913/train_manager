import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from './station.entity';

@Entity()
export class Segment {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Station)
  @JoinColumn()
  d_station_id: Station;

  @OneToOne(() => Station)
  @JoinColumn()
  a_station_id: Station;

  @Column('float')
  distance: number;
}
