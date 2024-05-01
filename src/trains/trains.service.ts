import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wagon } from './entities/wagon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrainsService {
  constructor(
    @InjectRepository(Wagon)
    private readonly wagonRepository: Repository<Wagon>,
  ) {}
  // create(createTrainDto: CreateTrainDto) {
  //   return 'This action adds a new train';
  // }
  // findAll() {
  //   return `This action returns all trains`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} train`;
  // }
  // update(id: number, updateTrainDto: UpdateTrainDto) {
  //   return `This action updates a #${id} train`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} train`;
  // }
}
