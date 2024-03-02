import { ApiProperty } from "@nestjs/swagger";

export class CreateRoundDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty()
  start_time: string;

  @ApiProperty()
  end_time?: boolean = false;
}
