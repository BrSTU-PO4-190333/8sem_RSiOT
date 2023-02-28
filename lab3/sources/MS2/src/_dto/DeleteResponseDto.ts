import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionDto } from './HttpExceptionDto';

class DeleteResDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description:
      'Необработанный результат запроса к базе данных, который может включать дополнительную информацию о выполнении запроса, например количество затронутых строк или любые сгенерированные сообщения об ошибках',
  })
  raw: [];

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Количество сущностей затронутых DELETE-операцией',
    example: 0,
  })
  affected: number;

  // = = = = = = = = = = = = = = = =
}

export class DeleteResponseDto extends HttpExceptionDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    required: false,
  })
  more: DeleteResDto;

  // = = = = = = = = = = = = = = = =
}
