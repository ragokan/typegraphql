import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "./RegisterDuplicateValidation";

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: "Please enter a valid email!" })
  @IsEmailAlreadyExist({ message: "Email is already in use!" })
  email: string;

  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(5, 255, { message: "Please enter a password that longer than 5 letters!" })
  password: string;
}
