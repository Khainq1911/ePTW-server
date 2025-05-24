import { Client } from 'pg';
import 'dotenv/config';
export const generateCodeTelegram = (start: string = 'eptw') =>
  start + Math.floor(Math.random() * 1000000);

export const createDatabase = async dbName => {
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
