import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
// import { join } from 'path';

@Module({
  // imports: [
  //   MailerModule.forRoot({
  //     transport: {
  //       // host: 'sandbox.smtp.mailtrap.io',
  //       // port: 2525,
  //       // secure: false,
  //       host: 'smtp.gmail.com', // Serveur SMTP de Gmail
  //       port: Number('587'), // Port SMTP de Gmail
  //       secure: false, // Gmail nécessite TLS, donc secure est false
  //       auth: {
  //         // user: '3ef93f3984497f',
  //         // pass: '199ba629607cae',
  //         user: 'applijurya@gmail.com',
  //         pass: 'Azer*1234567',
  //       },
  //     },
  //     // defaults: {
  //     //   from: '"From Name" <from@example.com>', // Adresse e-mail par défaut
  //     //   // from: 'andrinantenainarasolondraibe@gmail.com', // Adresse e-mail par défaut
  //     // },
  //     preview: true,
  //     template: {
  //       dir: join(__dirname, 'templates'), // Répertoire des templates
  //       adapter: new EjsAdapter(), // Utilisation de EJS comme moteur de template
  //       options: {
  //         strict: true, // Options de rendu du template
  //       },
  //     },
  //   }),
  // ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
