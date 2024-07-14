import * as amqp from "amqplib";

export const createMQProducer = async (rabbitmqConfig: any) => {
  console.log("⏳⏳ Connecting to RabbitMQ...");
  const connection = await amqp.connect(rabbitmqConfig.url);
  const channel = await connection.createChannel();

  // create multiple exchanges
  for (const exchange of rabbitmqConfig.exchanges) {
    await channel.assertExchange(exchange.name, exchange.type);
  }

  // create multiple queues
  for (const queue of rabbitmqConfig.queues) {
    await channel.assertQueue(queue.name);

    // bind queue to specified exchange
    await channel.bindQueue(queue.name, queue.exchangeName, queue.routingKey);
  }
  if (!!channel) console.log("👌👌  Connected to Rabbit mq");
  return channel;
};
