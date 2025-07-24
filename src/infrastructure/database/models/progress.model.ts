import { Schema, model } from "mongoose";
import { IProgress } from "../../../domain/progress/progress.interface";

const progressSchema = new Schema<IProgress>(
  {
    enrollment: {
      type: Schema.Types.ObjectId,
      ref: "Enrollment",
      required: true,
    },
    lecture: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
    score: { type: Number },
    durationWatched: Number,
    percent: Number,
  },
  { timestamps: true }
);

export const Progress = model<IProgress>("Progress", progressSchema);
