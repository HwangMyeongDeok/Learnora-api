import { IAuthDocument } from './auth.interface';

export interface IAuthRepository {
  saveRefreshToken(userId: string, refreshToken: string, ip?: string, deviceId?: string): Promise<void>;
  getRefreshTokenInfo(refreshToken: string): Promise<{ userId: string; deviceId: string } | null>;
  revokeTokens(userId: string, deviceId: string, replacedByToken?: string): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
  saveOTP(email: string, otp: string): Promise<void>;
  revokeAllTokens(userId: string): Promise<void>;
  findRefreshTokenInDB(refreshToken: string): Promise<IAuthDocument | null>;
  isTokenReusedAndRevoked(refreshToken: string): Promise<boolean>;
}