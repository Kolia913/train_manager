import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Station } from './station.entity';

@Entity()
export class Segment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Station)
  dStation: Station;

  @ManyToOne(() => Station)
  aStation: Station;

  @Column('float')
  distance: number;
}
