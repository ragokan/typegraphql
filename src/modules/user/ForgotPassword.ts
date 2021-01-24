import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { SendEmail } from "../utils/SendEmail";
import { CreatePasswordResetUrl } from "../utils/CreateMailUrl";
import { PasswordInput } from "../../validation/PasswordValidation";
import { forgotPasswordConstant } from "../constants/RedisPrefixes";
import { redis } from "../../redis";
import bcrypt from "bcryptjs";
import { ExpressContext } from "../../types/ExpressContextType";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return true;
    await SendEmail(
      email,
      await CreatePasswordResetUrl(user.id),
      "Reset Password",
      "Please click here to reset your password."
    );
    return true;
  }

  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { password, token }: PasswordInput,
    @Ctx() { req }: ExpressContext
  ): Promise<User | null> {
    try {
      const userId = await redis.get(forgotPasswordConstant + token);
      if (!userId) return null;

      const user = await User.findOne(userId);
      if (!user) return null;

      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;

      await user.save();

      redis.del(forgotPasswordConstant + token);
      req.session.userId = userId;
      return user;
    } catch {
      return null;
    }
  }
}
