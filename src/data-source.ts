import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  //* ------------------ You must list all entities here for the CLI to find them ---------------------//
  entities: [User],

  //* -------------------This is crucial for migrations. It must be false.------------------------//
  synchronize: false,

  //* ---------------------This tells TypeORM where to find/create migration files--------------------//
  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  //* ---------------------Turn on logging to see what the CLI is doing---------------------//
  logging: true,
};

const AppDataSource = new DataSource(options);

export default AppDataSource;