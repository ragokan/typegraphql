import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../modules/utils/CreateSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

let schema: GraphQLSchema;

export const callGraphql = async ({ source, variableValues }: Options) => {
  if (!schema) schema = await createSchema();
  return graphql({
    schema,
    source,
    variableValues,
  });
};
