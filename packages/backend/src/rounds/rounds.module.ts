import { Module } from '@nestjs/common';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [PrismaModule, SocketModule],
  controllers: [RoundsController],
  providers: [RoundsService],
})
export class RoundsModule { }
