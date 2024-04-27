import { Passenger } from 'src/passenger/entities/passenger.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 24, unique: true })
  phone: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 500 })
  password: string;

  @Column('varchar', { length: 100 })
  name: string;

  @OneToMany(() => Passenger, (passenger: Passenger) => passenger.user, {
    onDelete: 'CASCADE',
  })
  passengers: Passenger[];
}
