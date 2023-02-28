import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PostCommmetsService } from './post-commmets.service';
import { CreatePostCommmetDto } from './dto/create-post-commmet.dto';
import { UpdatePostCommmetDto } from './dto/update-post-commmet.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCommmetEntity } from './entities/post-commmet.entity';
import { HttpExceptionDto } from 'src/_dto/HttpExceptionDto';
import { PostIsExistsGuard } from 'src/_guards/post-is-exists.guard';
import { CreatorCommentIsExistsGuard } from 'src/_guards/creator-comment-is-exists.guard';
import { UpdateResponseDto } from 'src/_dto/UpdateResponseDto';
import { DeleteResponseDto } from 'src/_dto/DeleteResponseDto';

@ApiTags('Коментарии поста')
@Controller('api/posts/:postId/commmets')
export class PostCommmetsController {
  // = = = = = = = = = = = = = = = =

  constructor(private readonly postCommmetsService: PostCommmetsService) {}

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Создание комментария',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создали комментарий',
    type: PostCommmetEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      '- Пост с переданным postId не существует \n\n' +
      '- Пользователь с переданным commentatorId не существует \n\n',
    type: HttpExceptionDto,
  })
  @UseGuards(PostIsExistsGuard)
  @UseGuards(CreatorCommentIsExistsGuard)
  @Post()
  create(
    @Body() createPostCommmetDto: CreatePostCommmetDto,
    @Param('postId') postId: string,
  ) {
    return this.postCommmetsService.create(createPostCommmetDto, +postId);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Получить список комментариев для поста',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получили список комментариев',
    type: PostCommmetEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пост с переданным postId не существует',
    type: HttpExceptionDto,
  })
  @UseGuards(PostIsExistsGuard)
  @Get()
  findAll(@Param('postId') postId: string) {
    return this.postCommmetsService.findAll(+postId);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Получить комментарий по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получили список комментариев',
    type: [PostCommmetEntity],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      '- Пост с переданным postId не существует \n\n' +
      '- Комментарий с переданным id не существует \n\n',
    type: HttpExceptionDto,
  })
  @UseGuards(PostIsExistsGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postCommmetsService.findOne(+id, +postId);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Обновление комментария по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пост с переданным id обновлен',
    type: UpdateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      '- Пост с переданным postId не существует \n\n' +
      '- Пользователь с переданным creatorId не существует \n\n' +
      '- Комментарий с переданным id не существует \n\n',
    type: UpdateResponseDto,
  })
  @UseGuards(PostIsExistsGuard)
  @UseGuards(CreatorCommentIsExistsGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostCommmetDto: UpdatePostCommmetDto,
    @Param('postId') postId: string,
  ) {
    return this.postCommmetsService.update(+id, updatePostCommmetDto, +postId);
  }

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Удаление комментария по id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пост с переданным id удален',
    type: DeleteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description:
      '- Пост с переданным postId не существует \n\n' +
      '- Комментарий с переданным id не существует \n\n',
    type: DeleteResponseDto,
  })
  @UseGuards(PostIsExistsGuard)
  @UseGuards(CreatorCommentIsExistsGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Param('postId') postId: string) {
    return this.postCommmetsService.remove(+id);
  }

  // = = = = = = = = = = = = = = = =
}
