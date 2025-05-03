import { Schema, model } from "mongoose";
import { INotification, NotificationType } from "./notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Notification = model<INotification>("Notification", notificationSchema);