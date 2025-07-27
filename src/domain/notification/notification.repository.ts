import { INotification } from "./notification.interface";

export interface INotificationRepository {
  create(data: Partial<INotification>): Promise<INotification>;
  findByUser(userId: string): Promise<INotification[]>;
  markAsRead(notificationId: string): Promise<INotification | null>;
  delete(notificationId: string): Promise<void>;
}
