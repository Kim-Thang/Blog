import { RefreshTokenRepository } from './../../repositories/refresh-token.repository';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './../../repositories/user.repository';
import { SignupDto } from 'src/dtos/signup.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/dtos/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { MoreThanOrEqual } from 'typeorm';

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

    return this.createAccessToken(user.id);
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

    const newToken = await this.createAccessToken(oldToken.userId);

    await this.refreshTokenRepository.delete({ token: refreshToken });

    return newToken;
  }

  async createAccessToken(userId: number): Promise<{ [key: string]: string }> {
    const accessToken = this.jwtService.sign(
      {
        id: userId,
        type: 'access_token',
      },
      { expiresIn: '1d' },
    );
    const refreshToken = uuidv4();

    await this.saveRefreshToken(userId, refreshToken);

    return { accessToken, refreshToken };
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    const value = this.refreshTokenRepository.create({
      userId: userId,
      token: refreshToken,
      expiryDate: expiryDate,
    });

    await this.refreshTokenRepository.save(value);
  }
}
