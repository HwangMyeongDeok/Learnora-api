import { getRabbitChannel } from "./rabbitmq.connection";

export const publishToQueue = async (queueName: string, payload: any) => {
  try {
    const channel = getRabbitChannel();
    
    await channel.assertQueue(queueName, { durable: true });
    
    const sent = channel.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(payload)),
      { persistent: true } // Lưu vào ổ cứng, RabbitMQ sập bật lại vẫn còn
    );

    if (sent) {
      console.log(`📤 Sent to '${queueName}':`, payload);
    } else {
      console.error(`❌ Failed to send to '${queueName}' (Buffer full)`);
    }
  } catch (error) {
    console.error("Error publishing to queue:", error);
  }
};