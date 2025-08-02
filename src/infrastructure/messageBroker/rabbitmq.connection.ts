import amqp, { Channel } from "amqplib";

let channel: Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  console.log("✅ Connected to RabbitMQ");
};

export const getRabbitChannel = (): Channel => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};
