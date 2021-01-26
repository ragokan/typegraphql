import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { createConnection, getConnectionOptions } from "typeorm";
import * as ground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";
import express from "express";
import cors from "cors";
import { createSchema } from "./modules/utils/CreateSchema";

(async () => {
  // DATABASE
  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  // APOLLO AND SCHEMA
  const schema = await createSchema();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res, connection }) => ({ req, res, connection }),
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  const app = express();
  app.use(
    cors({ origin: ["localhost:3000", "localhost:5000", "localhost:8000", process.env.frontendUrl], credentials: true })
  );

  // app.use(cors({ credentials: true, origin: process.env.frontendUrl }));

  // REDIS FOR SESSION
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: process.env.testMode
        ? undefined
        : new RedisStore({
            client: redis,
          }),
      name: "qid",
      secret: process.env.sessionSecret as string,
      resave: true,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 2, // 2 Hours
      },
    })
  );

  // SERVER
  apolloServer.applyMiddleware({ app, cors: false });
  app.get("/playground", ground.default({ endpoint: "/graphql", settings: { "schema.polling.enable": false } as any }));
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/playground`);
  });
})();
