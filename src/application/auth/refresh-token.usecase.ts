import jwt from "jsonwebtoken";
import { IAuthRepository } from "../../domain/auth/auth.repository.interface";
import ErrorHandler from "../../middleware/ErrorHandler";

export class RefreshTokenUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(refreshToken: string) {
    try {
      const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as {
        userId: string;
      };

      const stored = await this.authRepo.getRefreshToken(payload.userId);
      if (!stored || stored !== refreshToken)
        throw new ErrorHandler("Refresh token invalid", 403);

      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      return { accessToken: newAccessToken };
    } catch (err) {
      throw new ErrorHandler("Token expired or invalid", 403);
    }
  }
}
