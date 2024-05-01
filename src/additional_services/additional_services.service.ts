import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional_service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdditionalServicesService {
  constructor(
    @InjectRepository(AdditionalService)
    private readonly adServiceRepository: Repository<AdditionalService>,
  ) {}
  // create(createAdditionalServiceDto: CreateAdditionalServiceDto) {
  //   return 'This action adds a new additionalService';
  // }
  // findAll() {
  //   return `This action returns all additionalServices`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} additionalService`;
  // }
  // update(id: number, updateAdditionalServiceDto: UpdateAdditionalServiceDto) {
  //   return `This action updates a #${id} additionalService`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} additionalService`;
  // }

  async getWagonServices(wagonId: number) {
    const services = await this.adServiceRepository
      .createQueryBuilder('adS')
      .innerJoin('wagons_services', 'ws', 'ws.additional_service_id = adS.id')
      .where('ws.wagon_id = :wagonId', { wagonId })
      .getMany();

    return services;
  }
}
