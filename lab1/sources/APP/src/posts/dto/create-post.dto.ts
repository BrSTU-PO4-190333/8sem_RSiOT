import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид пользователя',
    example: 1,
  })
  @IsNumber()
  userId: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Заголовок поста',
    example: 'С Новым годом!',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Текст поста',
    example: 'Отмечается в ночь с 31 декабря по 1 января.',
  })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  // = = = = = = = = = = = = = = = =
}
