import { Injectable } from '@nestjs/common';
import { CreateAdditionalServiceDto } from './dto/create-additional_service.dto';
import { UpdateAdditionalServiceDto } from './dto/update-additional_service.dto';

@Injectable()
export class AdditionalServicesService {
  create(createAdditionalServiceDto: CreateAdditionalServiceDto) {
    return 'This action adds a new additionalService';
  }

  findAll() {
    return `This action returns all additionalServices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} additionalService`;
  }

  update(id: number, updateAdditionalServiceDto: UpdateAdditionalServiceDto) {
    return `This action updates a #${id} additionalService`;
  }

  remove(id: number) {
    return `This action removes a #${id} additionalService`;
  }
}
