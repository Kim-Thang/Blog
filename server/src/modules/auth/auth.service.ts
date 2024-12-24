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
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signupData: SignupDto) {
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

  async signIn(signinData: SignInDto) {
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

    return this.createAccessToken(user);
  }

  createAccessToken(user: User): string {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      { expiresIn: '1d' },
    );

    return accessToken;
  }
}
