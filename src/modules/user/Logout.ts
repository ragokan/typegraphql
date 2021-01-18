import { Resolver, Mutation, Ctx } from "type-graphql";
import { ExpressContext } from "../../types/ExpressContextType";

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logoutUser(@Ctx() { req }: ExpressContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      req.session.destroy((err) => {
        if (err) rej(false);
        res(true);
      })
    );
  }
}
