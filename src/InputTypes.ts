import { Field, InputType } from "type-graphql";

@InputType()
export class MovieUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  duration?: number;
}