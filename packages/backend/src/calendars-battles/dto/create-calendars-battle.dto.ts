import { ApiProperty } from "@nestjs/swagger";

export class CreateCalendarsBattleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  dates?: string;

  @ApiProperty({ required: false })
  description: string;
}
