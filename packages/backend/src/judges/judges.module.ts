import { Module, forwardRef } from '@nestjs/common';
import { JudgesService } from './judges.service';
import { JudgesController } from './judges.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/auth/constants';
import { ValidationEmailModule } from 'src/validation-email/validation-email.module';
import { EmailModule } from 'src/email/email.module';

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
  controllers: [JudgesController],
  providers: [JudgesService],
  exports: [JudgesService],
})
export class JudgesModule {}
