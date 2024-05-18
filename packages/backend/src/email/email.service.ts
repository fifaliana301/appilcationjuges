import { MailerService } from '@nestjs-modules/mailer';
// const nodemailer = require('nodemailer');
//
// interface Email {
//   to: string;
//   data: any;
// }
//
// const transporter = nodemailer.createTransport({
//   host: 'smtp.elasticemail.com',
//   port: 2525,
//   secure: false,
//   auth: {
//     user: 'andrinantenainarasolondraibe@gmail.com', // Votre adresse e-mail Gmail
//     pass: 'CFF375E9623F7C0419B235D17C39CEA40D8B', // Mot de passe de votre compte Gmail
//   },
// });

export class EmailService {

  constructor(private readonly mailerService: MailerService) { }

  async welcomeEmail(data: any) {
    const { email, name } = data;

    const subject = `Welcome to Company: ${name}`;

    const stock = await this.mailerService?.sendMail({
      to: email,
      subject,
      html: '<b>welcome</b>',
      // template: './welcome',
      // context: {
      //   name,
      // },
    });

    console.log({ stock, email, name })
    return stock;
    
    // const mailOptions = {
    //   from: 'andrinantenainarasolondraibe@gmail.com',
    //   to: email,
    //   subject: 'Email verification',
    //   html: '<p>Please click on the following link to verify your email address:</p>'
    // };
    //
    // transporter.sendMail(mailOptions, function(error, info) {
    //   if (error) {
    //     console.log('Error in sending email  ' + error);
    //     return true;
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     return false;
    //   }
    // });


  }

  async forgotPasswordEmail(data: any) {
    const { name, email, link } = data;

    const subject = `Company: Reset Password`;

    await this.mailerService?.sendMail({
      to: email,
      from: 'andrinantenainarasolondraibe@gmail.com',
      subject,
      template: './forgot-password',
      context: {
        link,
        name,
      },
    });
  }

  async validationEmail(data: any) {
    const { name, email, otp } = data;

    const subject = `Company: OTP To Verify Email`;

    await this.mailerService?.sendMail({
      to: email,
      from: 'andrinantenainarasolondraibe@gmail.com',
      subject,
      template: './verify-email',
      context: {
        otp,
        name,
      },
    });
  }
}
