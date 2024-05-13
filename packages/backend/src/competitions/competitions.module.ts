import { Module } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { CompetitionsController } from './competitions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InvitedJudgesModule } from 'src/invited-judges/invited-judges.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PrismaModule, 
    InvitedJudgesModule,
    EmailModule,
  ],
  controllers: [CompetitionsController],
  providers: [CompetitionsService],
})
export class CompetitionsModule {}
