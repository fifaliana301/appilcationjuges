import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }

  @Post("/login")
  login(@Body() createJudgeDto: any) {
    return this.authService.login(createJudgeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @Get('/all_comptes')
  getAllComptes() {
    return this.authService.getAllComptes();
  }
}
