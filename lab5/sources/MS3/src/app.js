require('dotenv').config({ path: `${process.env.NODE_ENV}.env` });

const { PubSub } = require('@google-cloud/pubsub');
const express = require('express');

function main() {
  // < < < < = = = = Кастыль, чтобы при $ `gcloud app browse` открывалась страничка с текстом :)
  const PORT = process.env.MS3_PORT;

  const app = express();

  app.get('/', function (req, res) {
    res.send({
      message: 'MS3 запущен и работает!',
    });
  });

  app.listen(PORT, (err) => {
    if (!err) {
      console.log(`Сервер запущен: http://localhost:${PORT}`);
      return;
    }
    console.log('Ошибка на сервере');
    console.log(err);
  });
  // = = = = > > > >

  // Создание экземпляра клиента PubSub
  const pubsub = new PubSub({
    projectId: process.env.MS3_GOOGLE_CLOUD_PROJECT_ID,
    credentials: {
      client_email: process.env.MS3_GOOGLE_CLOUD_SERVICE_EMAIL,
      private_key: process.env.MS3_GOOGLE_CLOUD_PUBSUB_PRIVATE_KEY,
    },
  });

  // Определение темы и сообщения
  const subscriptionName = process.env.MS3_GOOGLE_CLOUD_PUBSUB_MS2_TO_MS3_SUBSCRIBER;
  const subscription = pubsub.subscription(subscriptionName);

  console.log('Сервер начал прослушку сообщений Google Cloud PubSub');

  subscription.on('message', async (message) => {
    try {
      console.log(
        ` < < < < = = = = Полученное сообщение (${new Date().toJSON()}):`
      );
      const stringData = JSON.stringify(message.data);
      const buffer = JSON.parse(stringData);
      const data = Buffer.from(buffer.data).toString('utf-8');
      const uuid = data;
      console.log(`${data} - получено сообщение от MS2`);

      const topicName = process.env.MS3_GOOGLE_CLOUD_PUBSUB_MS3_TO_MS2_TOPIC;
      const result = Math.random() > 0.5;
      const date = new Date().toJSON();
      const answerData = JSON.stringify({
        date,
        uuid,
        result,
      });
      console.log(answerData);

      await publishMessage(answerData, pubsub, topicName);

      console.log(' = = = = > > > >');
      message.ack();
    } catch (err) {
      console.log(` !!! < < < < = = = = exception`);
      console.log(err);
      console.log(' !!! = = = = > > > > end exception');
    }
  });

  subscription.on('error', (error) => {
    console.error(`Received error: ${error}`);
  });
}

main();

async function publishMessage(data, pubSubClient, topicName) {
  const dataBuffer = Buffer.from(data);
  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Сообщение ${messageId} отправлено.`);
}
