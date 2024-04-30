import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Fare } from './entities/fare.entity';
import { GetFareDto } from './dto/get-fare.dto';

@Injectable()
export class FaresService {
  constructor(
    @InjectRepository(Fare) private readonly faresRepository: Repository<Fare>,
  ) {}
  // create(createFareDto: CreateFareDto) {
  //   return 'This action adds a new fare';
  // }

  async findAll() {
    const fares = await this.faresRepository.find();
    return GetFareDto.fromEntityArray(fares);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} fare`;
  // }

  // update(id: number, updateFareDto: UpdateFareDto) {
  //   return `This action updates a #${id} fare`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} fare`;
  // }
}
