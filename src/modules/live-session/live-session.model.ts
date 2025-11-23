import { Schema, model } from "mongoose";
import { ILiveSession, LiveSessionStatus } from "./live-session.interface";

const DOCUMENT_NAME = "LiveSession";
const COLLECTION_NAME = "LiveSessions";

const liveSessionSchema = new Schema<ILiveSession>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    title: { type: String, required: true },
    description: { type: String },
    
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    
    status: { 
        type: String, 
        enum: Object.values(LiveSessionStatus), 
        default: LiveSessionStatus.SCHEDULED 
    },
    streamUrl: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

liveSessionSchema.index({ course: 1, startTime: 1 });

liveSessionSchema.index({ instructor: 1, startTime: 1 });

export const LiveSessionModel = model<ILiveSession>(DOCUMENT_NAME, liveSessionSchema);