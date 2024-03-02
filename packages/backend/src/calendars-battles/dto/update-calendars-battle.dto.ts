import { PartialType } from '@nestjs/mapped-types';
import { CreateCalendarsBattleDto } from './create-calendars-battle.dto';

export class UpdateCalendarsBattleDto extends PartialType(CreateCalendarsBattleDto) {}
