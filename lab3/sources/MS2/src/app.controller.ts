import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  // = = = = = = = = = = = = = = = =

  @ApiOperation({
    summary: 'Переадресация на Swagger',
  })
  @Get()
  @Redirect('/api')
  getHello() {}

  // = = = = = = = = = = = = = = = =
}
