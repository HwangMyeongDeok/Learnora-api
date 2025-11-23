import { getRabbitChannel } from "./rabbitmq.connection";

type ConsumerHandler = (payload: any) => Promise<void>;

export const consumeQueue = async (
  queueName: string,
  handler: ConsumerHandler
) => {
  try {
    const channel = getRabbitChannel();
    await channel.assertQueue(queueName, { durable: true });

    // QUAN TRỌNG: Chỉ nhận 1 tin nhắn mỗi lần. 
    // Xử lý xong (ack) mới nhận tin tiếp theo. Tránh quá tải.
    channel.prefetch(1); 

    console.log(`🎧 Consumer started for queue: ${queueName}`);

    channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        try {
          const payload = JSON.parse(msg.content.toString());
          
          // Gọi hàm xử lý (Gửi mail, nén video...)
          await handler(payload);
          
          // Thành công -> Báo cho RabbitMQ biết để xóa tin nhắn
          channel.ack(msg);
        } catch (err) {
          console.error(`❌ Job failed in ${queueName}:`, err);
          
          // THẤT BẠI:
          // requeue = true: Đẩy lại vào hàng đợi để thử lại (Cẩn thận lặp vô tận nếu lỗi code)
          // requeue = false: Vứt đi (hoặc đẩy vào Dead Letter Queue nếu đã cấu hình)
          
          // Tech Lead khuyên: Tạm thời để false nếu bạn chưa setup Dead Letter Exchange.
          // Nhưng đúng ra nên log lỗi vào DB rồi mới vứt đi.
          channel.nack(msg, false, false); 
        }
      }
    });
  } catch (error) {
    console.error("Error consuming queue:", error);
  }
};