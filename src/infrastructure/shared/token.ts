import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { AuthModel } from "../database/models/auth.model";

export const generateTokens = async (userId: string, ip?: string, deviceId?: string) => {
  const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  const refreshToken = uuidv4();
  await AuthModel.create({ user: userId, token: refreshToken, ip, deviceId });

  return { accessToken, refreshToken };
};
