import { DocumentBuilder } from '@nestjs/swagger';
import { swaggerDescription } from './swagger-description';

const config = new DocumentBuilder()
  .setTitle('REST API документация')
  .setDescription(swaggerDescription)
  .setVersion('1.0.0')
  .setLicense(
    'GPL-3.0 license',
    'https://github.com/BrSTU-PO4-190333/sem8_RSiOT/blob/main/LICENSE',
  )
  .addTag('Пользователи', 'Регистрация пользователя')
  .addTag('Посты', 'CRUD для постов')
  .addTag('Коментарии поста', 'CRUD для комментариев поста')
  .build();

export default config;
