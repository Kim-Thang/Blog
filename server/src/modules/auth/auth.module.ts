import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../../repositories/user.repository';
import { User } from 'src/entities/user.entity';
import { RefreshToken } from 'src/entities/refresh-token';
import { RefreshTokenRepository } from 'src/repositories/refresh-token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [AuthService, UserRepository, RefreshTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}