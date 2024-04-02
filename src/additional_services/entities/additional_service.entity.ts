import { Wagon } from 'src/trains/entities/wagon.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdditionalService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('float')
  price: number;

  @ManyToMany(() => Wagon, (wagon: Wagon) => wagon.additionalServices, {
    onDelete: 'CASCADE',
  })
  wagons: Wagon[];
}
