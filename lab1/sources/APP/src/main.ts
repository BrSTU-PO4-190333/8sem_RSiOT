import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './_configs/swagger.config';

async function bootstrap() {
  const PORT = process.env.MS2_PORT || 3000;

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(PORT, () =>
    console.log(`Server start: http://localhost:${PORT}`),
  );
}
bootstrap();
