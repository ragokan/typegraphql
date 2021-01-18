import { Field, InputType } from "type-graphql";

@InputType()
export class ErrorType {
  @Field()
  message: string;
}
