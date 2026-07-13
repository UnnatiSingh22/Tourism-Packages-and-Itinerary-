import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new backend user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in to obtain JWT access token' })
  @ApiResponse({ status: 200, description: 'Token issued' })
  async login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
