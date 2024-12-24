import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshToken } from './entities/refresh-token';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "8f2fc0245d5173c797d4b8bc4df07dd2448f7d525b0153d3d2fef6afcbdc23ce53ad89bf92340407e6ee30a5359b062d6d67a974d47405d13e2030544f055ed959c7c6611c5186eabafc4e99dc12bc3fb33348396b2ba5e8f6b07113227e283ab5481487ab17322aa854cc44b5a2883522343edf744946d17af4f67de7c7091f",
    }),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'portfolio',
    entities: [User, RefreshToken],
    synchronize: true,
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
