import { Document, Types } from "mongoose";

export enum NotificationType {
  SYSTEM = "system",
  COURSE = "course",     
  COMMENT = "comment",    
  PAYMENT = "payment",    
  PROMOTION = "promotion" 
}

export enum NotificationChannel {
  IN_APP = "in-app",
  EMAIL = "email",
  SMS = "sms"
}

export interface INotification extends Document {
  user: Types.ObjectId;
  type: NotificationType;
  title?: string;
  message: string;
  read: boolean;
  seenAt?: Date;
  link?: string;
  targetId?: Types.ObjectId;
  deliveredVia: NotificationChannel;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationRepository {
  create(data: any): Promise<INotification>;
  
  findByUser(userId: string, page: number, limit: number): Promise<INotification[]>;
  
  countUnread(userId: string): Promise<number>;
  
  markAsRead(id: string, userId: string): Promise<INotification | null>;
  
  markAllAsRead(userId: string): Promise<void>;
}