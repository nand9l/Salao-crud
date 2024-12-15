import "reflect-metadata";
import { DataSource } from "typeorm";
import { config, dialect } from "../config/db.config";
import { Cliente } from "../models/clienteModel";  

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Cliente], 
    synchronize: true,
    logging: false,
});