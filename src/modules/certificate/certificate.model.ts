import { Schema, model } from "mongoose";
import { ICertificate } from "./certificate.interface";

const DOCUMENT_NAME = "Certificate";
const COLLECTION_NAME = "Certificates";

const certificateSchema = new Schema<ICertificate>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    issuedAt: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

certificateSchema.index({ user: 1, course: 1 }, { unique: true });

export const CertificateModel = model<ICertificate>(DOCUMENT_NAME, certificateSchema);