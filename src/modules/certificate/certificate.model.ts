import { Schema, model } from "mongoose";
import { ICertificate } from "./certificate.interface";

const certificateSchema = new Schema<ICertificate>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const Certificate = model<ICertificate>("Certificate", certificateSchema);