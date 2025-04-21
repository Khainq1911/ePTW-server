import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Public } from 'src/common/decorators/public.decorators';
import { User } from 'src/common/decorators/user.decorators';
import { UserEntity } from 'src/database/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('refresh-token')
  refreshToken(@Body() { refreshToken }) {
    return this.authService.refreshToken(refreshToken);
  }


  @Get("test")
  async findOne(@User() user: unknown) {
    return user
  }
}
