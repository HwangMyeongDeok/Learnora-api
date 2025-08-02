import { getRabbitChannel } from "./rabbitmq.connection";

type ConsumerHandler = (payload: any) => Promise<void>;

export const consumeQueue = async (
  queueName: string,
  handler: ConsumerHandler
) => {
  const channel = getRabbitChannel();
  await channel.assertQueue(queueName, { durable: true });

  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const payload = JSON.parse(msg.content.toString());
      try {
        await handler(payload);
        channel.ack(msg);
      } catch (err) {
        console.error("❌ Job failed:", err);
        channel.nack(msg, false, false); 
      }
    }
  });
};
