import { Document, Types } from "mongoose";

export interface IKeyToken extends Document {
  user: Types.ObjectId;
  publicKey: string;         
  privateKey: string;        
  refreshToken: string;       
  refreshTokensUsed: string[];
  deviceId: string;  
}

export interface IKeyTokenRepository {
  createKeyToken(data: {
    userId: string;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
    deviceId: string;
  }): Promise<string | null>;

  findByUserIdAndDeviceId(userId: string, deviceId: string): Promise<IKeyToken | null>;
  findByRefreshToken(refreshToken: string): Promise<IKeyToken | null>;
  findByRefreshTokenUsed(refreshToken: string): Promise<IKeyToken | null>;
  
  updateTokenRotation(
    id: Types.ObjectId | string, 
    oldRefreshToken: string, 
    newRefreshToken: string
  ): Promise<IKeyToken | null>;

  removeKeyById(id: string): Promise<any>;
  removeKeyByUserId(userId: string): Promise<any>;

  saveOTP(email: string, otp: string): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
}