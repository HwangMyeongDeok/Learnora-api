import { Schema, model } from "mongoose";
import { IReview } from "./review.interface";

const DOCUMENT_NAME = "Review";
const COLLECTION_NAME = "Reviews";

const reviewSchema = new Schema<IReview>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

reviewSchema.index({ course: 1, user: 1 }, { unique: true });

reviewSchema.index({ course: 1, createdAt: -1 });

export const ReviewModel = model<IReview>(DOCUMENT_NAME, reviewSchema);