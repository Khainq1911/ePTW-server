import { createDatabase } from '../common/utils';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import 'dotenv/config';

const dbName = process.env.POSTGRES_NAME || 'eptw';

const InitialDatabase = async () => {
  await createDatabase(dbName);

  const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: dbName,
    port: 5432,
    entities: ['src/database/entities/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*.{ts,js}'],
    seeds: ['src/database/seeds/*.{ts,js}'],
  };

  const AppDataSource = new DataSource(dataSourceOptions);

  return AppDataSource;
};

export default InitialDatabase();
