import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

(async () => {
  const app = express();

  const options = await getConnectionOptions(process.env.NODE_ENV || "development");
  await createConnection({ ...options, name: "default", logging: false });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/graphql`);
  });
})();
