import { createConnection } from "typeorm";

export const testConnection = (drop: boolean = false) =>
  createConnection({
    name: "development",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hammer90",
    database: "ormlord",
    synchronize: drop,
    dropSchema: drop,
    entities: ["src/entity/**/*.ts"],
  });
