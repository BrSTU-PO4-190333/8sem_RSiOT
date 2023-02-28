import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DMS_HOST,
    port: Number(process.env.DMS_PORT),
    username: process.env.DMS_USER,
    password: process.env.DMS_PASS,
    database: process.env.DMS_NAME,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
