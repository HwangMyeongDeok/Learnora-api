import { Types } from "mongoose";
import { KeyTokenModel } from "./key-token.model";
import { IKeyToken, IKeyTokenRepository } from "./key-token.interface";
import { redisClient } from "../../infrastructure/config/redis";

export class KeyTokenRepository implements IKeyTokenRepository {

  async createKeyToken({
    userId,
    publicKey,
    privateKey,
    refreshToken,
    deviceId,
  }: {
    userId: string;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
    deviceId: string;
  }): Promise<string | null> {
    const filter = { user: new Types.ObjectId(userId), deviceId };
    const update = {
      publicKey,
      privateKey,
      refreshToken,
      refreshTokensUsed: [], 
    };

    const tokens = await KeyTokenModel.findOneAndUpdate(filter, update, {
      upsert: true, 
      new: true,    
    }).lean<IKeyToken>(); 

    return tokens ? tokens.publicKey : null;
  }

  async findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<IKeyToken | null> {
    return await KeyTokenModel.findOne({
      user: new Types.ObjectId(userId),
      deviceId: deviceId,
    }).lean<IKeyToken>();
  }

  async findByRefreshToken(refreshToken: string): Promise<IKeyToken | null> {
    return await KeyTokenModel.findOne({ refreshToken }).lean<IKeyToken>();
  }

  async findByRefreshTokenUsed(refreshToken: string): Promise<IKeyToken | null> {
    return await KeyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean<IKeyToken>();
  }

  async updateTokenRotation(
    id: Types.ObjectId | string, 
    oldRefreshToken: string, 
    newRefreshToken: string
  ): Promise<IKeyToken | null> {
    return await KeyTokenModel.findByIdAndUpdate(
        id, 
        {
            $set: { refreshToken: newRefreshToken },
            $addToSet: { refreshTokensUsed: oldRefreshToken }
        },
        { new: true }
    ).lean<IKeyToken>();
  }

  async removeKeyById(id: string): Promise<any> {
    return await KeyTokenModel.findByIdAndDelete(id);
  }

  async removeKeyByUserId(userId: string): Promise<any> {
    return await KeyTokenModel.deleteMany({ user: new Types.ObjectId(userId) });
  }

  async saveOTP(email: string, otp: string): Promise<void> {
    const ttl = process.env.OTP_EXPIRES_IN ? parseInt(process.env.OTP_EXPIRES_IN) : 60;
    await redisClient.set(`otp:${email}`, otp, "EX", ttl); 
  }

  async verifyOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = await redisClient.get(`otp:${email}`);
    
    if (storedOTP === otp) {
        await redisClient.del(`otp:${email}`);
        return true;
    }
    return false;
  }
}