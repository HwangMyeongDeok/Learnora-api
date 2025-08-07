import { model, Schema } from "mongoose";
import { IAuthDocument } from "../../../domain/auth/auth.interface";

const AuthSchema = new Schema<IAuthDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true },
    deviceId: { type: String },
    ip: { type: String },
    replacedByToken: { type: String },
    revoked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AuthModel = model<IAuthDocument>("Auth", AuthSchema);
