import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  // @Post()
  // create(@Body() createRouteDto: CreateRouteDto) {
  //   return this.routesService.create(createRouteDto);
  // }

  // @Get()
  // findAll() {
  //   return this.routesService.findAll();
  // }

  @HttpCode(HttpStatus.OK)
  @Get()
  findOne(
    @Query('departure_station') departureStationId: string,
    @Query('arrival_station') arrivalStationId: string,
  ) {
    return this.routesService.findOne(+departureStationId, +arrivalStationId);
  }
  @HttpCode(HttpStatus.OK)
  @Get('full')
  findFull(
    @Query('wagon_id') wagonId: string,
    @Query('departure_order') departureOrder: string,
    @Query('arrival_order') arrivalOrder: string,
  ) {
    return this.routesService.findFullOne(
      +wagonId,
      +departureOrder,
      +arrivalOrder,
    );
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
  //   return this.routesService.update(+id, updateRouteDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.routesService.remove(+id);
  // }
}
