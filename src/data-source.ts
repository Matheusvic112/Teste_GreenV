import "dotenv/config"
import path from "path"
import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"
import { Companies } from "./entities/companies.entities"
import { Default1688509858758 as migration} from "../src/migrations/1688509858758-default"
import { User } from "./entities/user.entities"
import { Veiculos } from "./entities/cars.entities"

const dataSourceConfig = ():DataSourceOptions =>{
  const entitiesPath: string = path.join(__dirname, "./entities/**.{js, ts}")
  const migrationsPath: string = path.join(__dirname, "./migrations/**.{js, ts}")
  const dbUrl: string | undefined = process.env.DATABASE_URL
  if (!dbUrl) {
    throw new Error("ENV var DATABASE_URL does not exists")
    
}
const nodeEnv: string | undefined = process.env.NODE_ENV

    if (nodeEnv === "test") {
        return {
            type: "postgres",
            database: "mydatabase",
            synchronize: true,
            entities: [entitiesPath]
        }

    }

    return {
        type: "postgres",
        url: process.env.DATABASE_URL!,
        synchronize: true,
        logging: true,
        migrations:[migration],
        entities: [User,Companies,Veiculos]
    }
}

const AppDataSource = new DataSource(dataSourceConfig())

export { AppDataSource }