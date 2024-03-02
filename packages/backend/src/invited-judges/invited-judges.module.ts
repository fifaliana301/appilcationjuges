import { Module } from '@nestjs/common';
import { InvitedJudgesService } from './invited-judges.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InvitedJudgesController } from './invited-judges.controller';

@Module({
  controllers: [InvitedJudgesController],
  providers: [InvitedJudgesService, PrismaService],
  exports: [InvitedJudgesService]
})
export class InvitedJudgesModule { }
