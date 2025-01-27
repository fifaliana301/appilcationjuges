// import { MailerService } from '@nestjs-modules/mailer';

import * as nodemailer from 'nodemailer';

import { google } from 'googleapis';

import * as dotenv from 'dotenv';

import { contentValidationEmailHtml } from 'src/utils/email-html.utils';

import { CreateEmailDto } from './dto/create-email.dto';

dotenv.config();

export class EmailService {

  private oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );


  constructor(
    // private readonly mailerService: MailerService
  ) {
    this.oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  }

  async sendMail(mailData: CreateEmailDto) {
    console.log({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
    });
    try {
      const accessToken = await this.oAuth2Client.getAccessToken();
      console.log(accessToken.token);

      const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.USER_EMAIL,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken.token,
        },
      });

      const mailOptions = {
        from: `Appli Jury <${process.env.USER_EMAIL}>`,
        to: mailData.to,
        subject: mailData.subject,
        url: mailData.url,
        html: contentValidationEmailHtml(mailData.validationCode, mailData.url, mailData.competition),
      };

      console.log(mailOptions)


      const result = await transport.sendMail(mailOptions);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async sendConfirmeUrlEmail(mailData: CreateEmailDto) {
    console.log(mailData)
    return this.sendMail({
      to: mailData.to,
      subject: mailData.subject,
      url: mailData.url,
      competition: mailData.competition
    });
  }

  async forgotPasswordEmail(data: any) {
    const { name, email, link } = data;

    const subject = `Company: Reset Password`;

    // await this.mailerService?.sendMail({
    //   to: email,
    //   from: 'andrinantenainarasolondraibe@gmail.com',
    //   subject,
    //   template: './forgot-password',
    //   context: {
    //     link,
    //     name,
    //   },
    // });
  }

  async validationEmail(data: any) {
    const { name, email, otp } = data;

    const subject = `Company: OTP To Verify Email`;

    // await this.mailerService?.sendMail({
    //   to: email,
    //   from: 'andrinantenainarasolondraibe@gmail.com',
    //   subject,
    //   template: './verify-email',
    //   context: {
    //     otp,
    //     name,
    //   },
    // });
  }
}
