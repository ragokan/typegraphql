import { v4 } from "uuid";
import { redis } from "../../redis";
import { confirmMailPrefix, forgotPasswordPrefix } from "../constants/RedisPrefixes";

export const CreateConfirmationUrl = async (userId: number | string): Promise<string> => {
  const token = v4();
  await redis.set(confirmMailPrefix + token, userId, "ex", 60 * 60 * 24);
  return `${process.env.confirmationUrl}/${token}`;
};

export const CreatePasswordResetUrl = async (
  userId: number | string
): Promise<string> => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, "ex", 60 * 60 * 24);
  return `${process.env.mailResetUrl}/${token}`;
};
