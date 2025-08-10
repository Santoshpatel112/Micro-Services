const amqp = require('amqplib');

let connection;
let channel;
const Rabbitmq_URL = process.env.RabbitMQ_URL ;
async function connectRabbitMQ(Rabbitmq_URL) {
    console.log("Connecting to RabbitMQ...");
  if (!connection) {
    connection = await amqp.connect(Rabbitmq_URL);
    channel = await connection.createChannel();
  }
  return channel;
}

async function PublishToQueue(queue, message, url = 'amqp://localhost') {
    console.log(`Publishing message to queue: ${queue}`);
    const ch = await connectRabbitMQ(url);
    await ch.assertQueue(queue, { durable: true });
    ch.sendToQueue(queue, Buffer.from(message));
}

async function SubscribeToQueue(queue, onMessage, url = 'amqp://localhost') {
    console.log(`Subscribing to queue: ${queue}`);
    const ch = await connectRabbitMQ(url);
    await ch.assertQueue(queue, { durable: true });
    ch.consume(queue, (msg) => {
        if (msg !== null) {
            onMessage(msg.content.toString());
            ch.ack(msg);
        }
    });
}

module.exports = {
    connect: connectRabbitMQ,
    PublishToQueue,
    SubscribeToQueue,
};