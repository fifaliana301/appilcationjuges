import { Test, TestingModule } from '@nestjs/testing';
import { CalendarsBattlesController } from './calendars-battles.controller';
import { CalendarsBattlesService } from './calendars-battles.service';

describe('CalendarsBattlesController', () => {
  let controller: CalendarsBattlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarsBattlesController],
      providers: [CalendarsBattlesService],
    }).compile();

    controller = module.get<CalendarsBattlesController>(CalendarsBattlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
