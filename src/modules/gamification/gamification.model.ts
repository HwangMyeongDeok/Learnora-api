import { Schema, model } from "mongoose";
import { IBadge, IGamification } from "./gamification.interface";

const DOCUMENT_NAME = "Gamification";
const COLLECTION_NAME = "Gamifications";

const badgeSchema = new Schema<IBadge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  earnedAt: { type: Date, default: Date.now } 
}, { _id: false });

const gamificationSchema = new Schema<IGamification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, default: 0 },
    badges: [badgeSchema],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

gamificationSchema.index({ user: 1 }, { unique: true });

gamificationSchema.index({ points: -1 }); 

export const GamificationModel = model<IGamification>(DOCUMENT_NAME, gamificationSchema);