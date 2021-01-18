import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { SendEmail } from "../utils/SendEmail";
import { CreatePasswordResetUrl } from "../utils/CreateMailUrl";

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
}
