import { Module } from '@nestjs/common';
import { CalendarsBattlesService } from './calendars-battles.service';
import { CalendarsBattlesController } from './calendars-battles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CalendarsBattlesController],
  providers: [CalendarsBattlesService],
})
export class CalendarsBattlesModule {}
