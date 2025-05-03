import { Schema, model } from "mongoose";
import { IUser, UserRole } from "../../../domain/user/user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    avatar: { type: String },
    bio: { type: String },
    socialLinks: [{ platform: String, url: String }],
  },
  { timestamps: true }
);


export const User = model<IUser>("User", userSchema);