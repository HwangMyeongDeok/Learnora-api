import { Schema, model } from "mongoose";
import { ILiveSession, LiveSessionStatus } from "./live-session..interface";

const liveSessionSchema = new Schema<ILiveSession>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    status: { type: String, enum: Object.values(LiveSessionStatus), default: LiveSessionStatus.SCHEDULED },
    streamUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export const LiveSession = model<ILiveSession>("LiveSession", liveSessionSchema);