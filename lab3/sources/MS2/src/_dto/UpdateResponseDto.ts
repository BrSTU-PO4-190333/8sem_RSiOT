import { HttpException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class UpdateResDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description:
      'Массив сгенерированных объектов карты, которые содержат информацию о любых значениях, сгенерированных базой данных во время операции обновления (например, значения по умолчанию или значения, сгенерированные триггерами)',
  })
  generatedMaps: [];

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description:
      'Необработанный ответ из базы данных, который может быть полезен для отладки или понимания точных деталей операции обновления',
  })
  raw: [];

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Количество строк, затронутых UPDATE-операцией',
    example: 0,
  })
  affected: number;

  // = = = = = = = = = = = = = = = =
}

export class UpdateResponseDto extends HttpException {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    required: false,
  })
  more: UpdateResDto;

  // = = = = = = = = = = = = = = = =
}
