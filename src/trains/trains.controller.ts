import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TrainsService } from './trains.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { CreateWagonDto } from './dto/create-wagon.dto';

@Controller('trains')
export class TrainsController {
  constructor(private readonly trainsService: TrainsService) {}

  @Post()
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainsService.create(createTrainDto);
  }

  @Get()
  findAll() {
    return this.trainsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainsService.findOne(+id);
  }

  @Get('wagon/:id')
  findWagon(@Param('id') wagonId: string) {
    return this.trainsService.findWagon(+wagonId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainDto: CreateWagonDto) {
    return this.trainsService.update(+id, updateTrainDto);
  }

  @Delete('wagon/:id')
  remove(@Param('id') id: string) {
    return this.trainsService.remove(+id);
  }
}
