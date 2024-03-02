import { Test, TestingModule } from '@nestjs/testing';
import { InvitedJudgesController } from './invited-judges.controller';
import { InvitedJudgesService } from './invited-judges.service';

describe('InvitedJudgesController', () => {
  let controller: InvitedJudgesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedJudgesController],
      providers: [InvitedJudgesService],
    }).compile();

    controller = module.get<InvitedJudgesController>(InvitedJudgesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
