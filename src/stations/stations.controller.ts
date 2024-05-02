import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.stationsService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Post('/map-to-segments')
  mapToSegments(@Body() body: { station_ids: number[] }) {
    return this.stationsService.mapStationsToSegments(body.station_ids);
  }
}
