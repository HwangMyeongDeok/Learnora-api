import { IAuthRepository } from "../../../domain/auth/auth.repository";
import { redis } from "../../config/redis";
import { AuthModel } from "../models/auth.model";

export class AuthRepository implements IAuthRepository {
  async saveRefreshToken(userId: string, token: string): Promise<void> {
    await AuthModel.findOneAndUpdate(
      { userId },
      { refreshToken: token },
      { upsert: true, new: true }
    );
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const authRecord = await AuthModel.findOne({ userId });
    return authRecord?.refreshToken ?? null;
  }

  async revokeTokens(userId: string): Promise<void> {
    await AuthModel.findOneAndUpdate({ userId }, { refreshToken: null });
  }

  async saveOTP(email: string, otp: string): Promise<void> {
    await redis.set(`otp:${email}`, otp, { ex: 300 }); 
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await redis.get<string>(`otp:${email}`);
    return storedOTP === otp;
  }
}
