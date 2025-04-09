import { Body, Post, Get, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get('profile')
  profile() {
    return this.authService.profile();
  }
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
  @Post('refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
