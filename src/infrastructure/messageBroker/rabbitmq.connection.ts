import amqp, { Channel } from "amqplib";

let channel: Channel;

export const connectRabbitMQ = async () => {
  const RABBITMQ_URL = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`;

  const connection = await amqp.connect(RABBITMQ_URL  );
  channel = await connection.createChannel();
  console.log("✅ Connected to RabbitMQ");
};

export const getRabbitChannel = (): Channel => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};
