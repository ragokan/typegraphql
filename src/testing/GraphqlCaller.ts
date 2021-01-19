import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../modules/utils/CreateSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
  userId?: string | number;
}

let schema: GraphQLSchema;
import dotenv from "dotenv";

export const callGraphql = async ({ source, userId }: Options) => {
  dotenv.config();
  if (!schema) schema = await createSchema();
  return graphql({
    schema,
    source,
    contextValue: {
      req: {
        session: {
          userId,
        },
      },
      res: {
        clearCookie: () => jest.fn(),
      },
    },
  });
};
