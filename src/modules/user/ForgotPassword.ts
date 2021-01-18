import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { SendEmail } from "../utils/SendEmail";
import { CreatePasswordResetUrl } from "../utils/CreateMailUrl";
import { PasswordInput } from "../../validation/PasswordValidation";
import { forgotPasswordPrefix } from "../constants/RedisPrefixes";
import { redis } from "../../redis";
import bcrypt from "bcryptjs";

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

  @Mutation(() => Boolean)
  async changePassword(
    @Arg("data") { password, token }: PasswordInput
  ): Promise<boolean> {
    try {
      const userId = await redis.get(forgotPasswordPrefix + token);
      if (!userId) return false;
      const hashedPassword = await bcrypt.hash(password, 12);

      await User.update({ id: parseInt(userId) }, { password: hashedPassword });
      redis.del(forgotPasswordPrefix + token);
      return true;
    } catch {
      return false;
    }
  }
}
