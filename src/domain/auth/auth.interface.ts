export interface IAuthDocument extends Document {
    userId: string;
    refreshToken: string | null;
  }
  