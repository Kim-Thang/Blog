import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { User } from '@entities/user.entity';
import { RefreshToken } from '@entities/refresh-token';
import { UserModule } from '@modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true      
    }),  
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, RefreshToken],
    synchronize: true,
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
