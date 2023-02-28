import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './_configs/swagger.config';

// < < < = = = = For lab 3
import { PubSub } from '@google-cloud/pubsub';
import { v4 as uuid_v4 } from 'uuid';
import axios from 'axios';
// = = = = > > >

async function bootstrap() {
  const PORT = process.env.APP_PORT || 3000;
  console.log(process.env)

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  // < < < < = = = = For lab 3
  const timeout = Number(process.env.MS2_TIMEOUT);

  const pubsub = new PubSub({
    projectId: process.env.PUBSUB__PROJECT_ID,
    credentials: {
      client_email: process.env.PUBSUB__CLIENT_EMAIL,
      private_key: process.env.PUBSUB__PRIVATE_KEY,
    },
  });

  const answer = pubsub.topic(process.env.PUBSUB__TOPIC_MS3_TO_MS2);
  const subscription = answer.subscription(process.env.PUBSUB__SUB_MS3_TO_MS2);
  const messageResults = new Map<string, boolean>();

  subscription.on('message', async (message) => {
    // Получаю сообщения от MS3
    const data = JSON.parse(message.data);
    const data_uuid = data.uuid;
    const data_result = data.result;
    const data_date = data.date;
    console.log(data_date);
    console.log(` [*] ${data_uuid} - получен результат от MS3: ${data_result}`);

    messageResults.set(data_uuid, data_result);

    await message.ack();
  });

  app.use(async function (request, response, next) {
    // Отправляем сообщение на MS3
    const uuid = uuid_v4();
    const dataBuffer = Buffer.from(uuid);
    const messageId = await pubsub
      .topic(process.env.PUBSUB__TOPIC_MS2_TO_MS3)
      .publish(dataBuffer);

    console.log(` [*] ${uuid} - отправлено сообщение на MS3 (${messageId})`);

    // Ждем для того, чтобы выполнить верхний app.use() с получением сообщений
    setTimeout(async () => {
      const result = messageResults.get(uuid);
      if (result === undefined) {
        console.log(` [!] ${uuid} - тайм-аут ожидания ответа от MS3`);
        let data = {
          statusCode: 400,
          message: 'MS3 не ответил в течение заданного времени.',
          more: undefined,
        };
        // < < < < < ~ ~ ~ Этот код можно убрать, если не используем App Engine
        try {
          const result = await axios.get(process.env.MS3_URL); // включаем App Engine
          data.more = result.data; // пишем в ответе, что App Engine работает
        } catch (err) {
          data.more = err; // пишем в ответе, что App Engine не работает
        }
        // ~ ~ ~ > > > > >
        response.status(400).json(data);
      } else if (result) {
        console.log(
          ` [+] ${uuid} - выполняем запрос пользователя (т.к. пришел true)`,
        );
        next();
      } else {
        console.log(
          ` [-] ${uuid} - не выполняем запрос пользователя (т.к. пришел false)`,
        );
        response.status(400).json({
          statusCode: 400,
          message: 'MS3 решил не выполнять запрос',
        });
      }
    }, timeout);
  });
  // = = = = > > > >

  await app.listen(PORT, () =>
    console.log(`Server start: http://localhost:${PORT}`),
  );
}
bootstrap();
