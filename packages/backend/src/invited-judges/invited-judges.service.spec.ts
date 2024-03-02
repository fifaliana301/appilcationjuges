import { Test, TestingModule } from '@nestjs/testing';
import { InvitedJudgesService } from './invited-judges.service';

describe('InvitedJudgesService', () => {
  let service: InvitedJudgesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedJudgesService],
    }).compile();

    service = module.get<InvitedJudgesService>(InvitedJudgesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
