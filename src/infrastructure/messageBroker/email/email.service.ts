import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password",
  },
});

interface SendEmailPayload {
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailPayload) => {
  await transporter.sendMail({
    from: `"No Reply" <your_email@gmail.com>`,
    to,
    subject,
    html,
  });
  console.log("📧 Email sent to:", to);
};
