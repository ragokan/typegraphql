import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
  @Field()
  @Length(1, 255)
  name: string;

  @Field()
  owner: number;
}
