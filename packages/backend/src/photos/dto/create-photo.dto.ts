import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {

  @ApiProperty()
  id?: string;

  @ApiProperty()
  name: string;
  profile: boolean;

  @ApiProperty()
  competitors: any;

  competitorsId: string;

  @ApiProperty()
  users: any;

  @ApiProperty()
  usersId: string;
}
