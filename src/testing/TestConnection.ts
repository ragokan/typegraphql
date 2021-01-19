import { createConnection } from "typeorm";

export const testConnection = (drop: boolean = false) =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "hammer90",
    database: "ormlord-testing",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"],
  });
