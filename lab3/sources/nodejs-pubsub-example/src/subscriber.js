require('dotenv').config({ path: '.subscriber.env' });

const { PubSub } = require('@google-cloud/pubsub');

// Создание экземпляра клиента PubSub
const pubsub = new PubSub({
  projectId: process.env.PUBSUB__PROJECT_ID,
  credentials: {
    client_email: process.env.PUBSUB__CLIENT_EMAIL,
    private_key: process.env.PUBSUB__PRIVATE_KEY,
  },
});

// Определение темы и сообщения
const subscriptionName = process.env.PUBSUB__SUBSCRIBER;
const subscription = pubsub.subscription(subscriptionName);

console.log('Сервер начал прослушку сообщений');

subscription.on('message', (message) => {
  try {
    console.log(` < < < < = = = = Полученное сообщение (${new Date().toJSON()}):`);
    const data = JSON.parse(message.data);
    console.log(data);
    console.log(' = = = = > > > >');
    message.ack();
  }
  catch(err) {
    console.log(` < < < < = = = = exception`);
    console.log(message.data);
    console.log(' = = = = > > > > end exception');
  }
});

subscription.on('error', (error) => {
  console.error(`Received error: ${error}`);
});
