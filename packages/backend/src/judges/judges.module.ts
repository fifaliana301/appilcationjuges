import { Module } from '@nestjs/common';
import { JudgesService } from './judges.service';
import { JudgesController } from './judges.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/auth/constants';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
  ],
  controllers: [JudgesController],
  providers: [JudgesService],
  exports: [JudgesService],
})
export class JudgesModule {}
