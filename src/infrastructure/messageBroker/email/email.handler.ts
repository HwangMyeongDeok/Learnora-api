import { sendEmail } from "./email.service";

interface EmailJobPayload {
  to: string;
  subject: string;
  html: string;
}

export const handleEmailJob = async (payload: EmailJobPayload) => {
  if (!payload.to || !payload.subject || !payload.html) {
    throw new Error("Invalid email payload");
  }

  await sendEmail(payload);
};
