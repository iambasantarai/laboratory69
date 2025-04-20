import { join } from 'node:path';
import { DataSourceOptions } from 'typeorm';
import { dbConfig } from '../utils/env.util';

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [join(__dirname, '../**/**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../db/migrations/*.{ts,js}')],
  synchronize: false,
  migrationsTableName: 'migrations'
};
