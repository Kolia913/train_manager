import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { Repository } from 'typeorm';
import { GetStationDto } from './dto/get-station.dto';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
  ) {}
  // create(createStationDto: CreateStationDto) {
  //   return 'This action adds a new station';
  // }

  async findAll() {
    const stations = await this.stationRepository.find();
    return GetStationDto.fromEntityArray(stations);
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} station`;
  // }

  // update(id: number, updateStationDto: UpdateStationDto) {
  //   return `This action updates a #${id} station`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} station`;
  // }
}
