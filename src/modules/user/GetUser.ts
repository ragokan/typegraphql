import { Authorized, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { ExpressContext } from "../../types/ExpressContextType";
// import { AuthRequired } from "../middleware/AuthRequired";

@Resolver()
export class GetUserResolver {
  @Authorized()
  // @UseMiddleware(AuthRequired)
  @Query(() => User, { nullable: true })
  async getUser(@Ctx() { req }: ExpressContext) {
    if (!req.session.userId) return null;
    return await User.findOne(req.session.userId);
  }
}
