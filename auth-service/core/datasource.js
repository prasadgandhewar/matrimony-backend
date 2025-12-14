import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import path from 'path';
import User from "../entities/user.js";

const __dirname = new URL('.', import.meta.url).pathname;

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    //entities: [path.join(__dirname, 'entities', '*.js')]
    entities: [User]

});

export default AppDataSource;