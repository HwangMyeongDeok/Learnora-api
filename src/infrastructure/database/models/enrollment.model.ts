import { Schema, model } from "mongoose";
import { EnrollmentStatus, IEnrollment } from "../../../domain/enrollment/enrollment.interface";

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: Object.values(EnrollmentStatus), default: EnrollmentStatus.ACTIVE },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    lastAccessed: { type: Date },
  },
  { timestamps: false }
);

export const Enrollment = model<IEnrollment>("Enrollment", enrollmentSchema);