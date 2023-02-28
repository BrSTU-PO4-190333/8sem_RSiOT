import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'HTTP код',
  })
  statusCode: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'сообщение',
  })
  message: string;

  // = = = = = = = = = = = = = = = =
}
