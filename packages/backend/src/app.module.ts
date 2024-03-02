import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoundsModule } from './rounds/rounds.module';
import { ActionsModule } from './actions/actions.module';
import { CalendarsBattlesModule } from './calendars-battles/calendars-battles.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { CompetitorsModule } from './competitors/competitors.module';
import { JudgesModule } from './judges/judges.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TablesModule } from './tables/tables.module';
import { InvitedJudgesModule } from './invited-judges/invited-judges.module';
// import { SocketGateway } from './socket/socket.gateway';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RoundsModule,
    ActionsModule,
    CalendarsBattlesModule,
    CompetitionsModule,
    CompetitorsModule,
    JudgesModule,
    UsersModule,
    PhotosModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../uploads'),
    }),
    TablesModule,
    InvitedJudgesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
