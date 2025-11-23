import { Schema, model } from "mongoose";
import { EnrollmentStatus, IEnrollment } from "./enrollment.interface";

const DOCUMENT_NAME = "Enrollment";
const COLLECTION_NAME = "Enrollments";

const enrollmentSchema = new Schema<IEnrollment>(
  {
    _id: { type: Schema.Types.ObjectId },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    status: { 
        type: String, 
        enum: Object.values(EnrollmentStatus), 
        default: EnrollmentStatus.ACTIVE 
    },
    enrolledAt: { type: Date, default: Date.now },
    pricePaid: { type: Number, required: true, default: 0 },
    couponCode: { type: String },
    completedAt: { type: Date },
    lastAccessed: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

enrollmentSchema.index({ student: 1, enrolledAt: -1 });

export const EnrollmentModel = model<IEnrollment>(DOCUMENT_NAME, enrollmentSchema);