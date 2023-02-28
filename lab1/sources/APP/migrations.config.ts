import { DataSource, DataSourceOptions } from 'typeorm';

import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const dataSourceOptions: DataSourceOptions = {
  type:
    process.env.MS2_DB_TYPE == 'postgres'
      ? 'postgres'
      : process.env.MS2_DB_TYPE == 'mysql'
      ? 'mysql'
      : process.env.MS2_DB_TYPE == 'mariadb'
      ? 'mariadb'
      : 'postgres',
  host: process.env.MS2_DB_HOST,
  port: Number(process.env.MS2_DB_PORT),
  username: process.env.MS2_DB_USER,
  password: process.env.MS2_DB_PASS,
  database: process.env.MS2_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
