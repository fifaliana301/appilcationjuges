import { Test, TestingModule } from '@nestjs/testing';
import { ValidationEmailService } from './validation-email.service';

describe('ValidationEmailService', () => {
  let service: ValidationEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationEmailService],
    }).compile();

    service = module.get<ValidationEmailService>(ValidationEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
