import { emailConfig } from '@/config/secret.config';
import * as NodeMail from 'nodemailer';
import { type SendMailOptions } from 'nodemailer';
import type Mail from 'nodemailer/lib//mailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import { type Readable } from 'stream';

const emailCreateConfig: SMTPTransport.Options = {
  service: emailConfig.service,
  from: `${emailConfig.alias}<${emailConfig.username}>`,
  host: emailConfig.host,
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.username,
    pass: emailConfig.password,
  },
};

class Email {
  private readonly transporter;
  constructor() {
    this.transporter = NodeMail.createTransport(emailCreateConfig);
  }

  // 发送验证码的方法
  send({
    email,
    text,
    subject = 'tutu',
  }: {
    email: string;
    subject?: string;
    text?: string | Buffer | Readable | Mail.AttachmentLike | undefined;
  }) {
    const options: SendMailOptions = {
      from: `${emailConfig.alias}<${emailConfig.username}>`,
      to: email,
      subject,
      text,
    };

    this.transporter.sendMail(options, (error) => {
      if (error !== null) {
        console.log('邮件发送失败', error);
      } else {
        console.log('邮件发送成功');
      }
    });
  }
}

export default new Email();
