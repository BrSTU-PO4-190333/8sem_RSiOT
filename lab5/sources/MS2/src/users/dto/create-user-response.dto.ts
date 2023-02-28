import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponseDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид пользователя',
    example: 1,
  })
  id: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Логин пользователя',
    example: 'user',
  })
  login: string;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@example.com',
  })
  email: string;

  // = = = = = = = = = = = = = = = =
}
