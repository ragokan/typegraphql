import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import { LoginResolver } from "./modules/user/Login";
import * as ground from "graphql-playground-middleware-express";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";

(async () => {
  const RedisStore = connectRedis(session);

  const app = express();
  app.use(cors());
  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: "qid",
      secret: "aslkdfjoiq12312",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
      },
    })
  );

  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver, LoginResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });

  app.get("/playground", ground.default({ endpoint: "/graphql" }));

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/playground`);
  });
})();
