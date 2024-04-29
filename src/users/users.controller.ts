import { UsersService } from 'src/users/users.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';

import { Request as ExpressRequest } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '..//auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<PublicUserDto> {
    return this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  @Put()
  update(
    @Request() req: ExpressRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<PublicUserDto> {
    return this.usersService.update(req.user.sub, updateUserDto);
  }
}
