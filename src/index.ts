import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import * as ground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createSchema } from "./modules/utils/CreateSchema";

(async () => {
  dotenv.config();
  // DATABASE
  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  // APOLLO AND SCHEMA
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
  });

  const app = express();

  app.use(cors());

  // REDIS FOR SESSION
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "sessionSecret",
      secret: process.env.sessionSecret as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  // SERVER
  apolloServer.applyMiddleware({ app, cors: false });
  app.get("/playground", ground.default({ endpoint: "/graphql" }));
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/playground`);
  });
})();
