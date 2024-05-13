import { Test, TestingModule } from '@nestjs/testing';
import { ValidationEmailController } from './validation-email.controller';
import { ValidationEmailService } from './validation-email.service';

describe('ValidationEmailController', () => {
  let controller: ValidationEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValidationEmailController],
      providers: [ValidationEmailService],
    }).compile();

    controller = module.get<ValidationEmailController>(ValidationEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
