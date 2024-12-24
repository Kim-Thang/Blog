import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from 'src/dtos/signup.dto';
import { SignInDto } from 'src/dtos/signin.dto';
import { RefreshTokenDto } from 'src/dtos/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto): Promise<void> {
    return this.authService.signUp(signupData);
  }

  @Post('signin')
  async signIn(
    @Body() signInData: SignInDto,
  ): Promise<{ [key: string]: string }> {
    return this.authService.signIn(signInData);
  }

  @Post('refreshToken')
  async refreshToken(
    @Body() refreshTokenData: RefreshTokenDto,
  ): Promise<{ [key: string]: string }> {
    return this.authService.refreshToken(refreshTokenData.refreshToken);
  }
}
