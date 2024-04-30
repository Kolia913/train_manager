import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { FaresService } from './fares.service';

@Controller('fares')
export class FaresController {
  constructor(private readonly faresService: FaresService) {}

  // @Post()
  // create(@Body() createFareDto: CreateFareDto) {
  //   return this.faresService.create(createFareDto);
  // }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.faresService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.faresService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFareDto: UpdateFareDto) {
  //   return this.faresService.update(+id, updateFareDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.faresService.remove(+id);
  // }
}
