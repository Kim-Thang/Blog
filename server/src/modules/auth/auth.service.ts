import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MoreThanOrEqual } from 'typeorm';
import { UserRepository } from '@repositories/user.repository';
import { RefreshTokenRepository } from '@repositories/refresh-token.repository';
import { SignupDto } from '@dtos/signup.dto';
import { SignInDto } from '@dtos/signin.dto';
import { TOKEN_TYPE } from '@common/constants/token.constant';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async signUp(signupData: SignupDto): Promise<void> {
    const { email, password, firstName, lastName } = signupData;

    const existEmail = await this.userRepository.findOne({
      where: { email: email },
    });

    if (existEmail) {
      throw new BadRequestException('Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const value = this.userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await this.userRepository.save(value);
  }

  async signIn(signinData: SignInDto): Promise<{ [key: string]: string }> {
    const { email, password } = signinData;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Password incorrect!');
    }

    return this.createToken(user.id);
  }

  async refreshToken(refreshToken: string): Promise<{ [key: string]: string }> {
    const oldToken = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
      withDeleted: true,
    });

    if (!oldToken) {
      throw new UnauthorizedException('Refresh token is valid!');
    }

    const newToken = await this.createToken(oldToken.userId);

    return newToken;
  }

  async createToken(userId: number): Promise<{ [key: string]: string }> {
    const accessToken = this.jwtService.sign(
      {
        id: userId,
        type: TOKEN_TYPE.ACCESS_TOKEN,
      },
      { expiresIn: '1h' },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: userId,
        type: TOKEN_TYPE.REFRESH_TOKEN,
      },
      { expiresIn: '1h' },
    );

    await this.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.refreshTokenRepository.update(
      {
        userId,
      },
      {
        token: refreshToken,
        expiryDate: expiryDate,
      },
    );
  }
}
