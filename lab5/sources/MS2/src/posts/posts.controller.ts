import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { HttpExceptionDto } from 'src/_dto/HttpExceptionDto';
import { DeleteResponseDto } from 'src/_dto/DeleteResponseDto';
import { UpdateResponseDto } from 'src/_dto/UpdateResponseDto';

@ApiTags('Посты')
@Controller('/api/posts')
export class PostsController {
  // = = = = = = = = = = = = = = = =

  constructor(private readonly postsService: PostsService) {}

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Создание поста',
  })
  @ApiResponse({
    type: PostEntity,
    status: HttpStatus.CREATED,
    description: 'Создан пост',
  })
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<CreatePostDto> {
    return this.postsService.create(createPostDto);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Получить пост по id',
  })
  @ApiResponse({
    type: PostEntity,
    status: HttpStatus.OK,
    description: 'Получили пост по id',
  })
  @ApiResponse({
    type: HttpExceptionDto,
    status: HttpStatus.NOT_FOUND,
    description: 'Не найден пост по id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Обновить пост по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Обновили пост по id',
    type: UpdateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Не найден пост по id',
    type: UpdateResponseDto,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Удалить пост по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Удалили пост по id',
    type: DeleteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Не найден пост по id',
    type: DeleteResponseDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }

  // = = = = = = = = = = = = = = = =s
}
