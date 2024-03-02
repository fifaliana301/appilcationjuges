import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JudgesModule } from 'src/judges/judges.module';
import { UsersModule } from 'src/users/users.module';
import { CompetitorsModule } from 'src/competitors/competitors.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { jwtSecret } from './constants';

@Module({
  imports: [
    PrismaModule,
    JudgesModule,
    UsersModule,
    CompetitorsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }, // e.g. 30s, 7d, 24h
    }),
  ],
  providers: [
    AuthService, 
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}
