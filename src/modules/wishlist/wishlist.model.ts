import { Schema, model } from "mongoose";
import { IWishlist } from "./wishlist.interface";

const DOCUMENT_NAME = "Wishlist";
const COLLECTION_NAME = "Wishlists";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

export const WishlistModel = model<IWishlist>(DOCUMENT_NAME, wishlistSchema);