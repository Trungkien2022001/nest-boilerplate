import { join } from 'path';

import NodeMailer from 'nodemailer';
import * as hbs from 'express-handlebars';
import { ADMIN_EMAIL, ADMIN_EMAIL_NAME, ADMIN_PASSWORD_EMAIL } from 'src/constants';

const mailHost = 'smtp.gmail.com';
const mailPort = 465;

export class SendEmailHelper {
  private static async sendMail(to, subject, content): Promise<string> {
    const transporter = NodeMailer.createTransport({
      host: mailHost,
      port: mailPort,
      secure: true,
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_PASSWORD_EMAIL,
      },
    });

    const options = {
      from: {
        name: ADMIN_EMAIL_NAME,
        address: ADMIN_EMAIL,
      },
      to,
      subject,
      html: content,
    };

    const result = await transporter.sendMail(options);
    return result;
  }

  static async sendOTP({ to, subject, OTP }): Promise<string> {
    const hbsTemplate = hbs.create();
    const content = await hbsTemplate.render(join(__dirname, '../../src/views/send-otp.hbs'), {
      otp: OTP,
    });
    return this.sendMail(to, subject, content);
  }

  static async sendLinkDefaultPassword({
    to,
    subject,
    password,
    link,
  }): Promise<string> {
    const hbsTemplate = hbs.create();
    const templatePath = `../../src/views/send-default-password.hbs`;

    const content = await hbsTemplate.render(join(__dirname, templatePath), {
      password,
      link,
    });

    return this.sendMail(to, subject, content);
  }

  static async sendNotificationOnAdminChangeManufactureEmail({
    to,
    subject,
    email,
    link,
  }): Promise<string> {
    const hbsTemplate = hbs.create();
    const templatePath = `../../src/views/send-notification-on-admin-change-manufacture-email.hbs`;

    const content = await hbsTemplate.render(join(__dirname, templatePath), {
      email,
      link,
    });

    return this.sendMail(to, subject, content);
  }
}
