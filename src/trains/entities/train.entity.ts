import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wagon } from './wagon.entity';

@Entity()
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  number: string;

  @Column('varchar', { length: 255 })
  type: string;

  @Column('varchar', { length: 255 })
  class: string;

  @OneToMany(() => Wagon, (wagon: Wagon) => wagon.train)
  wagons: Wagon[];
}
