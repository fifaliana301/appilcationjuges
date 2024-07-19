import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from 'src/prisma/prisma.module';
import { jwtSecret } from 'src/auth/constants';
import { ValidationEmailModule } from 'src/validation-email/validation-email.module';
import { EmailModule } from 'src/email/email.module';

import { CompetitorsController } from './competitors.controller';
import { CompetitorsService } from './competitors.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
    forwardRef(() => ValidationEmailModule),
    forwardRef(() => EmailModule),
  ],
  controllers: [CompetitorsController],
  providers: [CompetitorsService],
  exports: [CompetitorsService],
})
export class CompetitorsModule {}
