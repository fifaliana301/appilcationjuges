import { Test, TestingModule } from '@nestjs/testing';
import { CalendarsBattlesService } from './calendars-battles.service';

describe('CalendarsBattlesService', () => {
  let service: CalendarsBattlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarsBattlesService],
    }).compile();

    service = module.get<CalendarsBattlesService>(CalendarsBattlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
