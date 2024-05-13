import { PartialType } from '@nestjs/swagger';
import { CreateValidationEmailDto } from './create-validation-email.dto';

export class UpdateValidationEmailDto extends PartialType(CreateValidationEmailDto) {}
