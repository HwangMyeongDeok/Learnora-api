import { getRabbitChannel } from "./rabbitmq.connection";

export const publishToQueue = async (queueName: string, payload: any) => {
  const channel = getRabbitChannel();
  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(payload)), {
    persistent: true,
  });
};
