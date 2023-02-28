import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Логин пользователя',
    example: 'user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  login: string;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Электронная почта пользователя',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @IsEmail()
  email: string;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'secret123#$%',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(64)
  password: string;

  // = = = = = = = = = = = = = = = =

  hashPassword: string;

  // = = = = = = = = = = = = = = = =
}
