import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '@entities/user.entity';
import { RefreshToken } from '@entities/refresh-token';
import { UserRepository } from '@repositories/user.repository';
import { RefreshTokenRepository } from '@repositories/refresh-token.repository';


@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [AuthService, UserRepository, RefreshTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}