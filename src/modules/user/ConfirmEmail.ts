import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { ExpressContext } from "../../types/ExpressContextType";
import { redis } from "../../redis";
import { confirmMailPrefix } from "../constants/RedisPrefixes";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token") token: string,
    @Ctx() { req }: ExpressContext
  ): Promise<boolean> {
    const userId = await redis.get(confirmMailPrefix + token);
    if (!userId) return false;

    await User.update({ id: parseInt(userId) }, { confirmed: true });
    redis.del(token);
    return true;
  }
}
