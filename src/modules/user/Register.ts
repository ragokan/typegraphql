import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "../../validation/RegisterValidation";

@Resolver()
export class RegisterResolver {
  @Query(() => User)
  async getUser(@Arg("id") id: number) {
    return await User.findOne(id);
  }

  @Mutation(() => User)
  async registerUser(
    @Arg("user") { email, firstName, lastName, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
