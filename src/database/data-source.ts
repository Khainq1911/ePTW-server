import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'ePTW',
  port: 5432,
  entities: ['dist/database/entities/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.{ts,js}'],
};

export const AppDataSource = new DataSource(dataSourceOptions);
