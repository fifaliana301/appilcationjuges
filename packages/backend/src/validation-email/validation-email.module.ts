import { Module, forwardRef } from '@nestjs/common';
import { ValidationEmailService } from './validation-email.service';
import { ValidationEmailController } from './validation-email.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/auth/constants';
import { CompetitorsModule } from 'src/competitors/competitors.module';

@Module({
  imports: [
    PrismaModule, 
    EmailModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
    forwardRef(() => CompetitorsModule),
  ],
  controllers: [ValidationEmailController],
  providers: [ValidationEmailService],
  exports: [ValidationEmailService],
})
export class ValidationEmailModule {}
