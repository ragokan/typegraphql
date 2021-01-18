import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "../../validation/LoginValidation";
import { LoginContext } from "../../types/LoginContextType";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async loginUser(
    @Arg("user") { email, password }: LoginInput,
    @Ctx() { req }: LoginContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    req.session.userId = user.id;

    return user;
  }
}
