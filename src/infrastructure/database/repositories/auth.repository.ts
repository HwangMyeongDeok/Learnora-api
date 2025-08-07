import { IAuthDocument } from "../../../domain/auth/auth.interface";
import { IAuthRepository } from "../../../domain/auth/auth.repository.interface";
import { redisClient } from "../../config/redis";
import { AuthModel } from "../models/auth.model";

export class AuthRepository implements IAuthRepository {
  private getRedisKey(refreshToken: string): string {
    return `refresh_token:${refreshToken}`;
  }

  async saveRefreshToken(
    userId: string,
    token: string,
    ip?: string,
    deviceId: string = "unknown"
  ): Promise<void> {
    await AuthModel.create({
      user: userId,
      token,
      revoked: false,
      ip,
      deviceId,
    });

    const ttlSeconds = 7 * 24 * 60 * 60; // 7 days
    const value = JSON.stringify({ userId, deviceId });

    await redisClient.set(this.getRedisKey(token), value, "EX", ttlSeconds);
  }

  async getRefreshTokenInfo(
    refreshToken: string
  ): Promise<{ userId: string; deviceId: string } | null> {
    const raw = await redisClient.get(this.getRedisKey(refreshToken));
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }

    const authRecord = await AuthModel.findOne({
      token: refreshToken,
      revoked: false,
    });

    if (!authRecord) return null;

    return {
      userId: authRecord.user.toString(),
      deviceId: authRecord.deviceId ?? "unknown",
    };
  }

  async revokeTokens(userId: string, deviceId: string, replacedByToken?: string): Promise<void> {
    const tokens = await AuthModel.find({
      user: userId,
      deviceId,
      revoked: false,
    });

   await AuthModel.updateMany(
    { user: userId, deviceId: deviceId, revoked: false },
    {
      revoked: true,
      ...(replacedByToken ? { replacedByToken } : {}),
    }
  );

    const redisKeys = tokens.map((t) => this.getRedisKey(t.token));
    if (redisKeys.length > 0) {
      await redisClient.del(...redisKeys);
    }
  }

  async revokeAllTokens(userId: string): Promise<void> {
    const tokens = await AuthModel.find({ user: userId, revoked: false });

    await AuthModel.updateMany({ user: userId }, { revoked: true });

    const redisKeys = tokens.map((t) => this.getRedisKey(t.token));
    if (redisKeys.length > 0) {
      await redisClient.del(...redisKeys);
    }
  }

  async saveOTP(email: string, otp: string): Promise<void> {
    await redisClient.set(`otp:${email}`, otp, "EX", 60); // OTP valid for 1 minute
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await redisClient.get(`otp:${email}`);
    return storedOTP === otp;
  }

  async findRefreshTokenInDB(
    refreshToken: string
  ): Promise<IAuthDocument | null> {
    return await AuthModel.findOne({
      token: refreshToken,
      revoked: false,
    });
  }

  async isTokenReusedAndRevoked(refreshToken: string): Promise<boolean> {
  const reused = await AuthModel.findOne({
    replacedByToken: refreshToken,
    revoked: true,
  });

  return !!reused;
}

}
