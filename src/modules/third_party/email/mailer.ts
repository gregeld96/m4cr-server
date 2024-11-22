import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const optionsSMTP : SMTPTransport.Options = {
  host: process.env.EMAIL_SMTP_HOST,
  port: Number(process.env.EMAIL_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP_USERNAME,
    pass: process.env.EMAIL_SMTP_PASSWORD,
  },
}

const transporter = createTransport(optionsSMTP);

export const sendEmail = async (from: string, to: string, subject: string, html: any, attachment: any) => {
  return transporter.sendMail(
    {
      from,
      to,
      subject,
      html,
      attachments: attachment || [],
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Message sent: ${info.response}`);
      }
    }
  );
}
