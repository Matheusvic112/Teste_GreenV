import "dotenv/config"
import path from "path"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

import "dotenv/config";

const setDataSourceConfig = ():any => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(__dirname,"./migrations/**.{js,ts}");
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return {
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        logging: true,
        synchronize: false,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    };
};

const dataSourceConfig = setDataSourceConfig();

export const AppDataSource = new DataSource(dataSourceConfig)