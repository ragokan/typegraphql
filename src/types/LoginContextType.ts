import { Request } from "express";

declare module "express-session" {
  interface Session {
    userId: string | number;
  }
}

export interface LoginContext {
  req: Request;
}
