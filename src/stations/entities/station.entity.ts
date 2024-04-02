import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
