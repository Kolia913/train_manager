import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Request as ExpressRequest } from 'express';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req: ExpressRequest,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    return this.ticketsService.create(req.user.sub, createTicketDto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: ExpressRequest) {
    return this.ticketsService.findAll(req.user.sub);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req: ExpressRequest, @Param('id') id: string) {
    return this.ticketsService.findOne(req.user.sub, +id);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Patch('use/:id')
  update(@Request() req: ExpressRequest, @Param('id') id: string) {
    return this.ticketsService.update(req.user.sub, +id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.ticketsService.remove(+id);
  // }

  @HttpCode(HttpStatus.OK)
  @Get('/available-seats/:id')
  findAllSeatsInWagon(@Param('id') wagonId: string) {
    return this.ticketsService.findAllSeats(+wagonId);
  }
}
