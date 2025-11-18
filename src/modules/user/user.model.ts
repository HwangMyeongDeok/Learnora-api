import { Schema, model } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.STUDENT },
    avatar: { type: String },
    bio: { type: String },
    socialLinks: [{ platform: String, url: String }],
    authType: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
    googleId: { type: String }, // ID từ Google
    facebookId: { type: String }, // ID từ Facebook
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);


export const User = model<IUser>("User", userSchema);