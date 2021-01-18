import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { ExpressContext } from "../../types/ExpressContextType";

@Resolver()
export class GetUserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() { req }: ExpressContext) {
    if (!req.session.userId) return null;
    return await User.findOne(req.session.userId);
  }
}
