import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Station } from './station.entity';
import { RoutePart } from 'src/routes/entities/route-part.entity';

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

  @OneToMany(() => RoutePart, (rtPart) => rtPart.segment)
  route_parts: RoutePart[];
}
