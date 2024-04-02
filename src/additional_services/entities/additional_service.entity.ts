import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdditionalService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('float')
  price: number;
}
