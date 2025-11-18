import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { AuthModel } from "../../modules/auth/auth.model";

export const generateTokens = async (userId: string, deviceId?: string) => {
  const accessToken = jwt.sign({ sub: userId }, process.env.JWT_SECRET as jwt.Secret, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

  const refreshToken = uuidv4();
  await AuthModel.create({ user: userId, token: refreshToken, deviceId });

  return { accessToken, refreshToken };
};
