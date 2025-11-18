import { Schema, model } from "mongoose";
import {
  INotification,
  NotificationChannel,
  NotificationType,
  
} from "./notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    seenAt: { type: Date },
    link: { type: String },
    targetId: { type: Schema.Types.ObjectId },
    deliveredVia: {
      type: String,
      enum: Object.values(NotificationChannel),
      default: "in-app",
    },
  },
  { timestamps: true }
);

export const Notification = model<INotification>(
  "Notification",
  notificationSchema
);
