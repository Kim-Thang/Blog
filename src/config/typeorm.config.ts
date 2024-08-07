import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'blog',
  entities: [User],
  synchronize: true,
};
