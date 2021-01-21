import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { confirmMailPrefix } from "../constants/RedisPrefixes";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string): Promise<boolean> {
    const userId = await redis.get(confirmMailPrefix + token);
    if (!userId) return false;

    await User.update({ id: parseInt(userId) }, { confirmed: true });
    redis.del(confirmMailPrefix + token);
    return true;
  }
}
