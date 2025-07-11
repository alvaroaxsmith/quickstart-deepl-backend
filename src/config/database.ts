import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const baseOptions = {
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "../entity/**/*.{js,ts}")],
  migrations: [path.join(__dirname, "../migration/**/*.{js,ts}")],
  subscribers: [],
};

const devOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  ...baseOptions,
};

const prodOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ...baseOptions,
};

const options = process.env.NODE_ENV === 'development' ? devOptions : prodOptions;

export const AppDataSource = new DataSource(options);
