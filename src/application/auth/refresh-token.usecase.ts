import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { IAuthRepository } from "../../domain/auth/auth.repository.interface";
import { IUserRepository } from "../../domain/user/user.repository.interface";
import { generateTokens } from "../../infrastructure/shared/token";

export class RefreshTokenUseCase {
  constructor(
    private readonly authRepo: IAuthRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    { refreshToken }: RefreshTokenDto,
    ip?: string,
    deviceId: string = "unknown"
  ) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }
    // Check tokenInfo in Redis
    const tokenInfo = await this.authRepo.getRefreshTokenInfo(refreshToken);

    if (tokenInfo) {
      const { userId, deviceId: storedDeviceId } = tokenInfo;

      if (storedDeviceId !== deviceId) {
        throw new Error("Device mismatch.");
      }

      await this.authRepo.revokeTokens(userId, deviceId, refreshToken);

      const user = await this.userRepo.findById(userId);
      if (!user || !user._id) {
        throw new Error("User not found or missing _id.");
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await generateTokens(user._id.toString(), ip, deviceId);
      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    }
    // Check for reused token
    const isReused = await this.authRepo.isTokenReusedAndRevoked(refreshToken);
    if (isReused) {
      const reusedSession = await this.authRepo.findRefreshTokenInDB(
        refreshToken
      );
      if (!reusedSession) {
        throw new Error("Refresh token reuse detected. All sessions revoked.");
      }
      const userId = reusedSession.user.toString();
      await this.authRepo.revokeAllTokens(userId);

      throw new Error("Refresh token reuse detected. All sessions revoked.");
    }
    //Fallback DB check
    const fallbackSession = await this.authRepo.findRefreshTokenInDB(
      refreshToken
    );
    if (!fallbackSession) {
      throw new Error("Refresh token not found.");
    }

    const userId = fallbackSession.user.toString();
    await this.authRepo.revokeTokens(userId, deviceId);

    const user = await this.userRepo.findById(userId);
    if (!user || !user._id) {
      throw new Error("User not found or missing _id.");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateTokens(
      user._id.toString(),
      ip,
      deviceId
    );
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }
}
