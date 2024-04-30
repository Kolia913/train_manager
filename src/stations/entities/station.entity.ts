import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Segment } from './segment.entity';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  city: string;

  @Column('double precision')
  lon: number;

  @Column('double precision')
  lat: number;

  @ManyToMany(() => Segment)
  segments: Segment[];
}
