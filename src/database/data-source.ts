import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import 'dotenv/config';
import { Client } from 'pg';

const createDatabase = async (dbName:string) => {
  try {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      port: 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    });
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`⏳ Creating database "${dbName}"...`);
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`✅ Database "${dbName}" created successfully!`);
    } else {
      console.log(`✅ Database "${dbName}" already exists.`);
    }

    await client.end();
  } catch (error) {
    console.error(`❌ Error creating database "${dbName}":`, error);
  }
};

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
