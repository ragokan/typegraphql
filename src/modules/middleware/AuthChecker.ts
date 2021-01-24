import { AuthChecker } from "type-graphql";
import { ExpressContext } from "../../types/ExpressContextType";

export const authChecker: AuthChecker<ExpressContext> = async ({ context: { req } }) => !!req.session.userId;
