import { Schema, model } from "mongoose";
import { IKeyToken } from "./key-token.interface";

const DOCUMENT_NAME = "KeyToken";
const COLLECTION_NAME = "KeyTokens";

const keyTokenSchema = new Schema<IKeyToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    publicKey: { type: String, required: true },
    privateKey: { type: String, required: true },
    
    refreshToken: { type: String, required: true, index: true }, 
    
    refreshTokensUsed: {
      type: [String],
      default: [],
    },
    deviceId: { type: String, required: true },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

keyTokenSchema.index({ user: 1, deviceId: 1 }, { unique: true });

export const KeyTokenModel = model<IKeyToken>(DOCUMENT_NAME, keyTokenSchema);