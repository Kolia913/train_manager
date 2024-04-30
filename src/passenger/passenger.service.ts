import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Repository } from 'typeorm';
import { Passenger } from './entities/passenger.entity';
import { GetPassengerDto } from './dto/get-passenger.dto';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Injectable()
export class PassengerService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengersRepository: Repository<Passenger>,
  ) {}
  async create(
    userId: number,
    createPassengerDto: CreatePassengerDto,
  ): Promise<GetPassengerDto> {
    const result = await this.passengersRepository
      .createQueryBuilder()
      .insert()
      .values({
        user: { id: userId },
        fare: { id: createPassengerDto.fare_id },
        ...createPassengerDto,
        birthDate: dayjs(createPassengerDto.birthDate, 'DD.MM.YYYY').format(
          'YYYY-MM-DD',
        ),
      })

      .returning('id')
      .execute();
    const insertedPassenger = await this.passengersRepository.findOneOrFail({
      where: {
        id: result.raw[0].id,
      },
      relations: ['fare', 'user'],
    });

    return GetPassengerDto.fromEntity(insertedPassenger);
  }

  async findAll(userId: number): Promise<GetPassengerDto[]> {
    const passengers = await this.passengersRepository.find({
      relations: ['fare', 'user'],
      where: { user: { id: userId } },
    });
    return GetPassengerDto.fromEntityArray(passengers);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} passenger`;
  // }

  // update(id: number, updatePassengerDto: UpdatePassengerDto) {
  //   return `This action updates a #${id} passenger`;
  // }

  async remove(id: number, userId: number) {
    const passenger = await this.passengersRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user', 'fare'],
    });
    if (!passenger) {
      throw new NotFoundException('Passenger not found!');
    }
    const removedPassenger = await this.passengersRepository.remove(passenger);

    return GetPassengerDto.fromEntity(removedPassenger);
  }
}
