import { envs } from '../../envs';
import { TypeOrmConfig } from '../typeorm/typeOrmConfig';

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: envs.POSTGRES_HOST,
      port: envs.POSTGRES_PORT,
      username: envs.POSTGRES_USER,
      password: envs.POSTGRES_PASSWORD,
      database: envs.POSTGRES_DB,
    };
  }
}
