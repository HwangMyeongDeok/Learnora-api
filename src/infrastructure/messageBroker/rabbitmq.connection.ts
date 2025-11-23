import * as amqp from "amqplib";

let connection: amqp.Connection | null = null;
let channel: amqp.Channel | null = null;

export const connectRabbitMQ = async (): Promise<void> => {
  try {
    if (connection) {
      console.log("ℹ️ RabbitMQ connection already exists.");
      return;
    }

    const amqpServer = process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
    console.log("⏳ Connecting to RabbitMQ...");

    // ============================================================
    // SỬA LẠI THEO Ý BẠN (GỌN NHẸ)
    // Dùng 'as any' để bỏ qua kiểm tra type của TypeScript
    // ============================================================
    connection = await amqp.connect(amqpServer) as any;

    // Lúc này connection đã được gán, gọi createChannel bình thường
    channel = await (connection as any)!.createChannel();

    console.log("✅ Connected to RabbitMQ");

    connection!.on("close", () => {
      console.error("⚠️ RabbitMQ connection closed. Retrying in 5s...");
      connection = null;
      channel = null;
      setTimeout(connectRabbitMQ, 5000);
    });

    connection!.on("error", (err) => {
      console.error("❌ RabbitMQ connection error:", err);
    });

  } catch (error) {
    console.error("❌ Failed to connect to RabbitMQ:", error);
    connection = null;
    channel = null;
    setTimeout(connectRabbitMQ, 5000);
  }
};

export const getRabbitChannel = (): amqp.Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not ready yet. Did you call connectRabbitMQ()?");
  }
  return channel;
};