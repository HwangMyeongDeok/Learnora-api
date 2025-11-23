import { Schema, model } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String }, 
    
    role: { 
        type: String, 
        enum: Object.values(UserRole), 
        default: UserRole.STUDENT 
    },
    
    avatar: { type: String, default: "" },
    bio: { type: String, default: "" },
    
    socialLinks: [
      {
        platform: String,
        url: String,
        _id: false 
      }
    ],
    
    authType: { type: String, enum: ['local', 'google', 'facebook'], default: 'local' },
    googleId: { type: String },
    facebookId: { type: String },
    isVerified: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.index({ name: "text", email: "text" });

export const UserModel = model<IUser>(DOCUMENT_NAME, userSchema);