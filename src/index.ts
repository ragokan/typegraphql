import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { RegisterResolver } from "./modules/user/Register";
import cors from "cors";

(async () => {
  const app = express();

  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RegisterResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(cors());
  const port = process.env.PORT || 8000;

  apolloServer.applyMiddleware({ app });
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
  });
})();
