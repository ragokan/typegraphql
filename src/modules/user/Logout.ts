import { Resolver, Mutation, Ctx } from "type-graphql";
import { ExpressContext } from "../../types/ExpressContextType";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logoutUser(@Ctx() { req, res }: ExpressContext): Promise<Boolean> {
    return new Promise((resolve, reject) =>
      req.session.destroy((err) => {
        if (err) return reject(false);

        res.clearCookie("sessionSecret");

        return resolve(true);
      })
    );
  }
}
