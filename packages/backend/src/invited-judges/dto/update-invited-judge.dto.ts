import { PartialType } from '@nestjs/swagger';
import { CreateInvitedJudgeDto } from './create-invited-judge.dto';

export class UpdateInvitedJudgeDto extends PartialType(CreateInvitedJudgeDto) {}
