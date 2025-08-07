import { sendEmail } from "./email.service";
import { publishToQueue } from "../rabbitmq.producer";

export interface EmailJobPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attempts?: number;
}

export const handleEmailJob = async (payload: EmailJobPayload) => {
  const maxRetries = 3;
  const attempts = payload.attempts ?? 0;

  try {
    await sendEmail(payload);
    console.log("✅ Email sent to:", payload.to);
  } catch (error) {
    const nextAttempts = attempts + 1;

    if (error instanceof Error) {
      console.error(
        `Failed to send email (attempt ${nextAttempts}):`,
        error.message
      );
    } else {
      console.error(`Failed to send email (attempt ${nextAttempts}):`, error);
    }
    if (nextAttempts < maxRetries) {
      const retryPayload: EmailJobPayload = {
        ...payload,
        attempts: nextAttempts,
      };
      await publishToQueue("email", retryPayload);
      console.log(
        `Retrying email to ${payload.to} (attempt ${nextAttempts})`
      );
    } else {
      console.error(
        `Max retry reached. Email to ${payload.to} failed permanently.`
      );
    }
  }
};
