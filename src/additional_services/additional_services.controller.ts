import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdditionalServicesService } from './additional_services.service';
import { CreateAdditionalServiceDto } from './dto/create-additional_service.dto';
import { UpdateAdditionalServiceDto } from './dto/update-additional_service.dto';

@Controller('additional-services')
export class AdditionalServicesController {
  constructor(private readonly additionalServicesService: AdditionalServicesService) {}

  @Post()
  create(@Body() createAdditionalServiceDto: CreateAdditionalServiceDto) {
    return this.additionalServicesService.create(createAdditionalServiceDto);
  }

  @Get()
  findAll() {
    return this.additionalServicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.additionalServicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdditionalServiceDto: UpdateAdditionalServiceDto) {
    return this.additionalServicesService.update(+id, updateAdditionalServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.additionalServicesService.remove(+id);
  }
}
