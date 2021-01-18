import { MiddlewareFn } from "type-graphql";
import { ExpressContext } from "../../types/ExpressContextType";

export const AuthRequired: MiddlewareFn<ExpressContext> = async (
  { context: { req } },
  next
) => {
  if (!req.session.userId) console.log("User Doesn't Exists!");
  else console.log("User ID: ", req.session.userId);

  return next();
};
