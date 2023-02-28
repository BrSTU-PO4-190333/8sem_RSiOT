require('dotenv').config({ path: '.publisher.env' });
const { PubSub } = require('@google-cloud/pubsub');

function main() {
  const pubSubClient = new PubSub({
    projectId: process.env.PUBSUB__PROJECT_ID,
    credentials: {
      client_email: process.env.PUBSUB__CLIENT_EMAIL,
      private_key: process.env.PUBSUB__PRIVATE_KEY,
    },
  });

  const topicName = process.env.PUBSUB__TOPIC;

  const data1 = JSON.stringify({
    userId: 1,
    title: 'Новости дня: космический туризм и рекорды криптовалюты.',
    content:
      'В настоящее время космический туризм становится всё более доступным, а биткоин и другие криптовалюты побивают новые рекорды. Ознакомьтесь с главными новостями дня!',
  });

  const data2 = JSON.stringify({
    userId: 2,
    title: 'Новый способ экономить на электричестве',
    content:
      'Поделюсь секретом, как уменьшить счет за электричество на 30%. Простой и эффективный метод без дополнительных затрат.',
  });

  const data3 = JSON.stringify({
    userId: 3,
    title: 'Новый проект на старте',
    content:
      'Начал работу над новым проектом. Хочу внедрить новейшие технологии и достичь успеха в кратчайшие сроки.',
  });

  publishMessage(data1, pubSubClient, topicName);
  publishMessage(data2, pubSubClient, topicName);
  publishMessage(data3, pubSubClient, topicName);
}

main();

async function publishMessage(data, pubSubClient, topicName) {
  const dataBuffer = Buffer.from(data);
  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Сообщение ${messageId} отправлено.`);
}
