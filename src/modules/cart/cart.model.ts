import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

export const Cart = model<ICart>("Cart", cartSchema);