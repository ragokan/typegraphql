import { graphql } from "graphql";
import { Maybe } from "graphql/jsutils/Maybe";
import { createSchema } from "../modules/utils/CreateSchema";

interface Options {
  source: string;
  variableValues?: Maybe<{ [key: string]: any }>;
}

export const callGraphql = async ({ source, variableValues }: Options) =>
  graphql({
    schema: await createSchema(),
    source,
    variableValues,
  });
