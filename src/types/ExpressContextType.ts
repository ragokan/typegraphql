export interface ExpressContext {
  req: Request & {
    session: {
      userId?: any;
    };
  };
  res: Response & {
    session: {
      userId?: any;
    };
  };
}
