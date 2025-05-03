import { model, Schema } from "mongoose";
import { IAuthDocument } from "../../../domain/auth/auth.interface";


const AuthSchema = new Schema<IAuthDocument>({
    userId: { type: String, required: true, unique: true },
    refreshToken: { type: String, default: null },
  });
  
  export const AuthModel = model<IAuthDocument>("Auth", AuthSchema);