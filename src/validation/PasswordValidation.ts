import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  token: string;

  @Field()
  @Length(5, 255, {
    message: "Please enter a valid password that longer than 5 letters!",
  })
  password: string;
}
