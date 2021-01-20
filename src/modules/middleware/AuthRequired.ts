import { MiddlewareFn, NextFn } from "type-graphql";
import { ExpressContext } from "../../types/ExpressContextType";

export const AuthRequired: MiddlewareFn<ExpressContext> = async (
  { context: { req } },
  next: NextFn
) => {
  if (!req.session.userId) console.log("User Doesn't Exists!");
  // throw error here, error message will be sent to the user
  else console.log("User ID: ", req.session.userId);

  return next();
};
