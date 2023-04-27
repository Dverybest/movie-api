import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = async (
  config: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.username'),
  password: config.get('database.password'),
  database: config.get('database.name'),
  autoLoadEntities: true,
  synchronize: true,
});
