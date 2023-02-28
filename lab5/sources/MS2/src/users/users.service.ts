import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  // = = = = = = = = = = = = = = = =

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // = = = = = = = = = = = = = = = =

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const email_candidate = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (email_candidate) {
      const message = 'Электронная почта занята';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    const login_candidate = await this.userRepository.findOne({
      where: {
        login: createUserDto.login,
      },
    });

    if (login_candidate) {
      const message = 'Логин занят';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    const password = createUserDto.password;
    const sald = 5;
    const hashPassword = await bcrypt.hash(password, sald);
    createUserDto.hashPassword = hashPassword;

    const created_entity = await this.userRepository.save(createUserDto);

    const result = await this.userRepository.findOne({
      select: {
        id: true,
        login: true,
        email: true,
      },
      where: {
        id: created_entity.id,
      },
    });

    return result;
  }

  async userIsExists(userId: number) {
    const candidate = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return candidate ? true : false;
  }

  // = = = = = = = = = = = = = = = =
}
