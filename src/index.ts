import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import * as ground from "graphql-playground-middleware-express";

(async () => {
  const app = express();
  app.use(cors());

  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver],
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
