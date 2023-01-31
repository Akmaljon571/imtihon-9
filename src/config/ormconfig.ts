import { DataSource } from "typeorm"
import path from "path"

export const dataSourse = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "imtihon",
  password: "akmal",
  entities: [path.resolve(__dirname, "..", "entities", "*.entite.{ts,js}")],
  migrations: [path.resolve(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
})
