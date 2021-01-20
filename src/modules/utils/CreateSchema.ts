import { buildSchema } from "type-graphql";
import { authChecker } from "../middleware/AuthChecker";

export const createSchema = async () =>
  await buildSchema({
    resolvers: [__dirname + "/../../modules/*/*.ts"],
    authChecker,
  });
