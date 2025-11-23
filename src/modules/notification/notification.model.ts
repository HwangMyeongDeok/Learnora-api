import { Schema, model } from "mongoose";
import { INotification, NotificationChannel, NotificationType } from "./notification.interface";

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: Object.values(NotificationType),
      required: true,
    },
    title: { type: String },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    seenAt: { type: Date },
    link: { type: String },
    targetId: { type: Schema.Types.ObjectId },
    deliveredVia: {
      type: String,
      enum: Object.values(NotificationChannel),
      default: NotificationChannel.IN_APP,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);


notificationSchema.index({ user: 1, createdAt: -1 });

notificationSchema.index({ user: 1, read: 1 });

export const NotificationModel = model<INotification>(DOCUMENT_NAME, notificationSchema);