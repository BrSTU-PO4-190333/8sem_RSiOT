import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostCommmetDto } from './dto/create-post-commmet.dto';
import { UpdatePostCommmetDto } from './dto/update-post-commmet.dto';
import { PostCommmetEntity } from './entities/post-commmet.entity';

@Injectable()
export class PostCommmetsService {
  // = = = = = = = = = = = = = = = =

  constructor(
    @InjectRepository(PostCommmetEntity)
    private postCommmetRepository: Repository<PostCommmetEntity>,
  ) {}

  // = = = = = = = = = = = = = = = =

  async create(createPostCommmetDto: CreatePostCommmetDto, postId: number) {
    createPostCommmetDto.postId = postId;
    const result = await this.postCommmetRepository.save(createPostCommmetDto);
    return result;
  }

  // = = = = = = = = = = = = = = = =

  async findAll(postId: number) {
    return await this.postCommmetRepository.find({
      where: {
        postId,
      },
    });
  }

  // = = = = = = = = = = = = = = = =

  async findOne(id: number, postId: number) {
    const candidate = await this.postCommmetRepository.findOne({
      where: {
        id,
        postId,
      },
    });

    if (!candidate) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Комментарий не сущуствует по переданному id';
      throw new HttpException(message, status);
    }

    return candidate;
  }

  // = = = = = = = = = = = = = = = =

  async update(
    id: number,
    updatePostCommmetDto: UpdatePostCommmetDto,
    postId: number,
  ) {
    updatePostCommmetDto.postId = postId;

    const result = await this.postCommmetRepository.update(
      id,
      updatePostCommmetDto,
    );

    if (result.affected == 0) {
      const status = HttpStatus.NOT_FOUND;
      const data = {
        statusCode: status,
        message: 'Комментария не найдено по переданому id',
        more: result,
      };
      throw new HttpException(data, status);
    }

    const data = {
      statusCode: HttpStatus.OK,
      message: 'Комментарий обновлен по переданному id',
      more: result,
    };
    return data;
  }

  // = = = = = = = = = = = = = = = =

  async remove(id: number) {
    const result = await this.postCommmetRepository.delete(id);

    if (result.affected == 0) {
      const status = HttpStatus.NOT_FOUND;
      const data = {
        statusCode: status,
        message: 'Комментарий не существует по переданному id',
        more: result,
      };
      throw new HttpException(data, status);
    }

    return result;
  }

  // = = = = = = = = = = = = = = = =
}
