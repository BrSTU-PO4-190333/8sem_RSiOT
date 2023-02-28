import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostCommmetDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид пользователя',
    example: 1,
  })
  @IsNumber()
  commentatorId: number;

  // = = = = = = = = = = = = = = = =

  @IsOptional()
  @IsNumber()
  postId: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Коментарий читателя поста',
    example: 'Это видео мне помогло разобраться с темой.',
  })
  @IsNotEmpty()
  @IsString()
  message: string;

  // = = = = = = = = = = = = = = = =
}
