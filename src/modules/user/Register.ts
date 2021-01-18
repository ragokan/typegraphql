import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "../../validation/RegisterValidation";
import { SendEmail } from "../utils/SendEmail";
import { CreateConfirmationUrl } from "../utils/CreateMailUrl";

@Resolver()
export class RegisterResolver {
  @Mutation(() => User)
  async registerUser(
    @Arg("user") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      }).save();

      await SendEmail(email, await CreateConfirmationUrl(user.id));

      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
