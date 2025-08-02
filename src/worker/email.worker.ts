import { handleEmailJob } from "../infrastructure/messageBroker/email/email.handler";
import { connectRabbitMQ } from "../infrastructure/messageBroker/rabbitmq.connection";
import { consumeQueue } from "../infrastructure/messageBroker/rabbitmq.consumer";

(async () => {
  await connectRabbitMQ();

  await consumeQueue("email.send", handleEmailJob);
})();
