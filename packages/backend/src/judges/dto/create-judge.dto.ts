import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class CreateJudgeDto {
  id: String
  firstname: String
  lastname: String
  specialty: String
  history: String
  password: String
}

export class AuthEntity {
  @ApiProperty()
  accessToken: string;
}
