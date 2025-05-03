import { Schema, model } from "mongoose";
import { IBadge, IGamification } from "../../../domain/interfaces/gamification.interface";

const badgeSchema = new Schema<IBadge>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

const gamificationSchema = new Schema<IGamification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, default: 0 },
    badges: [badgeSchema],
  },
  { timestamps: true }
);

export const Gamification = model<IGamification>("Gamification", gamificationSchema);