import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { LoginInput } from "../../validation/LoginValidation";
import { ExpressContext } from "../../types/ExpressContextType";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async loginUser(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { req }: ExpressContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    if (!user.confirmed) return null;

    req.session.userId = user.id;

    return user;
  }
}
