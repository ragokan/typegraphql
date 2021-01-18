import "reflect-metadata";
import * as ground from "graphql-playground-middleware-express";
import { createConnection, getConnectionOptions } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import { GetUserResolver } from "./modules/user/GetUser";
import { LoginResolver } from "./modules/user/Login";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import session from "express-session";
import { redis } from "./redis";
import express from "express";
import cors from "cors";

(async () => {
  // DATABASE
  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  // APOLLO AND SCHEMA
  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, GetUserResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  });

  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );

  // REDIS FOR SESSION
  const RedisStore = connectRedis(session);
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
      }),
      name: process.env.sessionName,
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
  apolloServer.applyMiddleware({ app });
  app.get("/playground", ground.default({ endpoint: "/graphql" }));
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/playground`);
  });
})();
