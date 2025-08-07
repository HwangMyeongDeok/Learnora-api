import nodemailer from "nodemailer";
import { EmailJobPayload } from "./email.handler";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password", 
  },
});

export const sendEmail = async ({ to, subject, text, html }: EmailJobPayload) => {
  await transporter.sendMail({
    from: `"No Reply" <your_email@gmail.com>`,
    to,
    subject,
    text,
    html,
  });
  console.log("📧 Email sent to:", to);
};