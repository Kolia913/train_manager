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
  dSstation: Station;

  @OneToOne(() => Station)
  @JoinColumn()
  aStation: Station;

  @Column('float')
  distance: number;
}
