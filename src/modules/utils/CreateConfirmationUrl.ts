import { v4 } from "uuid";
import { redis } from "../../redis";

export const CreateConfirmationUrl = async (userId: number | string): Promise<string> => {
  const token = v4();
  await redis.set(token, userId, "ex", 60 * 60 * 24);
  return `${process.env.confirmationUrl}/${token}`;
};
