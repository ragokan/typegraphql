import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  @IsEmail({}, { message: "Please enter a valid email!" })
  email: string;

  @Field()
  @Length(5, 255, {
    message: "Please enter a valid password that longer than 5 letters!",
  })
  password: string;
}
