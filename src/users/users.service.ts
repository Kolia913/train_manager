import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { PasswordHashService } from 'src/shared/services/password-hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async findById(id: number): Promise<PublicUserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    return PublicUserDto.fromEntity(user);
  }

  async findByPhone(phone: string): Promise<GetUserDto> {
    const user = await this.usersRepository.findOneBy({
      phone,
    });
    return GetUserDto.fromEntity(user);
  }

  async create(createUserDto: CreateUserDto): Promise<PublicUserDto> {
    const exisitngUser = await this.usersRepository.exists({
      where: { phone: createUserDto.phone },
    });
    if (exisitngUser) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await this.passwordHashService.getSaltedPasswordHash(
      createUserDto.password,
    );
    const newUser = await this.usersRepository.save({
      phone: createUserDto.phone,
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
    });
    return PublicUserDto.fromEntity(newUser);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<PublicUserDto> {
    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });
    return PublicUserDto.fromEntity(updatedUser);
  }
}
