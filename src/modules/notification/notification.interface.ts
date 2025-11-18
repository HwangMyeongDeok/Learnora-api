import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export enum NotificationType {
  COURSE_UPDATE = "course_update",
  ASSIGNMENT_DUE = "assignment_due",
  NEW_MESSAGE = "new_message",
  CERTIFICATE_ISSUED = "certificate_issued",
}
export enum NotificationChannel {
  IN_APP = "in-app",
  EMAIL = "email",
  PUSH = "push"
}


export interface INotification {
  _id?: Types.ObjectId;
  user: Types.ObjectId | IUser;
  type: NotificationType;
  message: string;
  read: boolean;
  createdAt?: Date;
  seenAt?: Date;
  link?: string;
  targetId?: Types.ObjectId;
  deliveredVia?: NotificationChannel;
}