import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const DOCUMENT_NAME = "Cart";
const COLLECTION_NAME = "Carts";

const cartSchema = new Schema<ICart>(
  {
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true,
        unique: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

export const CartModel = model<ICart>(DOCUMENT_NAME, cartSchema);