import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req: ExpressRequest,
    @Body() createPassengerDto: CreatePassengerDto,
  ) {
    return this.passengerService.create(req.user.sub, createPassengerDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: ExpressRequest) {
    return this.passengerService.findAll(req.user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req: ExpressRequest, @Param('id') id: string) {
    return this.passengerService.findOne(req.user.sub, +id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req: ExpressRequest,
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ) {
    return this.passengerService.update(req.user.sub, +id, updatePassengerDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req: ExpressRequest, @Param('id') id: string) {
    return this.passengerService.remove(+id, req.user.sub);
  }
}
