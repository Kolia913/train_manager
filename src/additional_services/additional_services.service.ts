import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalService } from './entities/additional_service.entity';
import { Repository } from 'typeorm';
import { GetServiceDto } from './dto/get-service.dto';
import { CreateAdditionalServiceDto } from './dto/create-additional_service.dto';
import { UpdateAdditionalServiceDto } from './dto/update-additional_service.dto';

@Injectable()
export class AdditionalServicesService {
  constructor(
    @InjectRepository(AdditionalService)
    private readonly adServiceRepository: Repository<AdditionalService>,
  ) {}
  async create(createAdditionalServiceDto: CreateAdditionalServiceDto) {
    const service = await this.adServiceRepository.save(
      createAdditionalServiceDto,
    );

    return GetServiceDto.fromEntity(service);
  }

  async findAll() {
    const services = await this.adServiceRepository.find();
    return GetServiceDto.fromEntityArray(services);
  }

  async findOne(id: number) {
    const service = await this.adServiceRepository.findOne({
      where: {
        id,
      },
    });

    return GetServiceDto.fromEntity(service);
  }

  async update(
    id: number,
    updateAdditionalServiceDto: UpdateAdditionalServiceDto,
  ) {
    const updatedService = await this.adServiceRepository.save(
      {
        id,
        ...updateAdditionalServiceDto,
      },
      {
        reload: true,
      },
    );

    return GetServiceDto.fromEntity(updatedService);
  }
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
