import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { HttpExceptionDto } from 'src/_dto/HttpExceptionDto';
import { PostsService } from 'src/posts/posts.service';
import { PostEntity } from 'src/posts/entities/post.entity';

@ApiTags('Пользователи')
@Controller('/api/users')
export class UsersController {
  // = = = = = = = = = = = = = = = =

  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Регистрация пользователя',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Пользователь зарегистрирован',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Логин занят/электронная почта занята',
    type: HttpExceptionDto,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  // = = = = = = = = = = = = = = = =

  @ApiTags('Посты')
  @ApiOperation({
    summary: 'Получить список постов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получили список постов',
    type: [PostEntity],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь по переданному userId не существует',
    type: HttpExceptionDto,
  })
  @Get(':userId/posts')
  findAllPosts(@Param('userId') userId: number) {
    return this.postsService.findAll(userId);
  }
}
