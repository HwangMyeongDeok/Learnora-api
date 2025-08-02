export interface IAuthRepository {
  saveRefreshToken(userId: string, token: string): Promise<void>;
  getRefreshToken(userId: string): Promise<string | null>;
  revokeTokens(userId: string): Promise<void>;
  verifyOTP(email: string, otp: string): Promise<boolean>;
  saveOTP(email: string, otp: string): Promise<void>;

}
 