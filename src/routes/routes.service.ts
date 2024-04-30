import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutePart } from './entities/route-part.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RoutePart)
    private readonly rtPartRepository: Repository<RoutePart>,
  ) {}
  // create(createRouteDto: CreateRouteDto) {
  //   return 'This action adds a new route';
  // }

  // findAll() {
  //   return `This action returns all routes`;
  // }

  async findOne(departureStationId: number, arrivalStationId: number) {
    const departureRouteParts = await this.rtPartRepository
      .createQueryBuilder('rp')
      .select('rp')
      .innerJoin('rp.segment', 's')
      .innerJoin('s.dStation', 'st')
      .where('st.id = :departureStationId', {
        departureStationId,
      })
      .getRawMany();

    const arrivalRouteParts = await this.rtPartRepository
      .createQueryBuilder('rp')
      .select('rp')
      .innerJoin('rp.segment', 's')
      .innerJoin('s.aStation', 'st')
      .where('st.id = :arrivalStationId', {
        arrivalStationId: arrivalStationId,
      })
      .getRawMany();
    console.log('arrival', departureRouteParts, 'departure', arrivalRouteParts);

    const result = departureRouteParts.map((departure) => {
      const matchingArrival = arrivalRouteParts.find(
        (arrival) =>
          arrival.rp_wagon_id === departure.rp_wagon_id &&
          departure.rp_order < arrival.rp_order,
      );

      return {
        wagon_id: departure.rp_wagon_id,
        departure: departure,
        arrival: matchingArrival || null,
      };
    });

    return result.filter((item) => item.arrival !== null);
  }

  async findFullOne(
    wagonId: number,
    departureOrder: number,
    arrivalOrder: number,
  ) {
    const fullRoute = this.rtPartRepository
      .createQueryBuilder('routePart')
      .where('routePart.wagon_id = :wagonId', { wagonId })
      .andWhere('routePart.order >= :departureOrder', { departureOrder })
      .andWhere('routePart.order <= :arrivalOrder', { arrivalOrder })
      .getMany();

    return fullRoute;
  }

  // update(id: number, updateRouteDto: UpdateRouteDto) {
  //   return `This action updates a #${id} route`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} route`;
  // }
}
