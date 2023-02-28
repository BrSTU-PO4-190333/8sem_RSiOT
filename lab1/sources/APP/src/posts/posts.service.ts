import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostsService {
  // = = = = = = = = = = = = = = = =

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private usersService: UsersService,
  ) {}

  // = = = = = = = = = = = = = = = =

  async create(createPostDto: CreatePostDto): Promise<CreatePostDto> {
    const candidate = await this.usersService.userIsExists(createPostDto.userId);

    if (!candidate) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Пользователь по переданому userId не существует';
      throw new HttpException(message, status);
    }

    return await this.postRepository.save(createPostDto);
  }

  // = = = = = = = = = = = = = = = =

  async findAll(userId: number): Promise<PostEntity[]> {
    const userIdExists = await this.usersService.userIsExists(userId);

    if (!userIdExists) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Пользователь по переданому userId не существует';
      throw new HttpException(message, status);
    }

    return await this.postRepository.find({
      where: {
        userId,
      },
    });
  }

  // = = = = = = = = = = = = = = = =

  async postIsExists(id: number) {
    const candidate = await this.postRepository.findOne({
      where: { id },
    });
    return candidate ? true : false;
  }

  async findOne(id: number) {
    const candidate = await this.postRepository.findOne({
      where: { id },
    });

    if (!candidate) {
      const message = 'Пост по переданному id не найден';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    return candidate;
  }

  // = = = = = = = = = = = = = = = =

  async update(id: number, updatePostDto: UpdatePostDto) {
    const userId = updatePostDto.userId;
    const userIdExists = await this.usersService.userIsExists(userId);

    if (!userIdExists) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Пользователь по переданому userId не существует';
      throw new HttpException(message, status);
    }

    const result = await this.postRepository.update(
      { id, userId },
      updatePostDto,
    );

    if (result.affected == 0) {
      const status = HttpStatus.NOT_FOUND;
      const data = {
        statusCode: status,
        message: 'Пост по переданному id не найден',
        more: result,
      };
      throw new HttpException(data, status);
    }

    const data = {
      statusCode: HttpStatus.OK,
      message: 'Пост по переданому id обновлен',
      more: result,
    };
    return data;
  }

  // = = = = = = = = = = = = = = = =

  async remove(id: number) {
    const result = await this.postRepository.delete(id);

    if (result.affected == 0) {
      const status = HttpStatus.NOT_FOUND;
      const data = {
        statusCode: status,
        message: 'Пост по переданному id не найден',
        more: result,
      };
      throw new HttpException(data, status);
    }

    return result;
  }

  // = = = = = = = = = = = = = = = =
}
