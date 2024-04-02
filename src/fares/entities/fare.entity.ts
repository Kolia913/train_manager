import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  title: string;

  @Column('float')
  discount: number;
}
