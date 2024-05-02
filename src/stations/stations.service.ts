import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Station } from './entities/station.entity';
import { In, Repository } from 'typeorm';
import { GetStationDto } from './dto/get-station.dto';
import { Segment } from './entities/segment.entity';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private readonly stationRepository: Repository<Station>,
    @InjectRepository(Segment)
    private readonly segmentRepository: Repository<Segment>,
  ) {}

  async findAll() {
    const stations = await this.stationRepository.find();
    return GetStationDto.fromEntityArray(stations);
  }

  async mapStationsToSegments(stationsIds: number[]) {
    const segments = await this.segmentRepository.find({
      where: [
        {
          aStation: {
            id: In(stationsIds),
          },
        },
        {
          dStation: {
            id: In(stationsIds),
          },
        },
      ],
      relations: {
        aStation: true,
        dStation: true,
      },
    });
    const mappedSegments: Segment[] = [];
    for (let i = 0; i < stationsIds.length; i++) {
      if (stationsIds[i + 1]) {
        const segment = segments.find(
          (item) =>
            item.dStation.id === stationsIds[i] &&
            item.aStation.id === stationsIds[i + 1],
        );
        mappedSegments.push(segment);
      }
    }

    return mappedSegments;
  }
}
