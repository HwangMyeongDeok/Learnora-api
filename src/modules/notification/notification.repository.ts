import { Notification } from "./notification.model";
import { INotification } from "./notification.interface";
import { INotificationRepository } from "../../domain/notification/notification.repository.interface";

export class NotificationRepository implements INotificationRepository {
  async create(data: Partial<INotification>): Promise<INotification> {
    return await Notification.create(data);
  }

  async findByUser(userId: string): Promise<INotification[]> {
    return await Notification.find({ user: userId }).sort({ createdAt: -1 });
  }

  async markAsRead(notificationId: string): Promise<INotification | null> {
    return await Notification.findByIdAndUpdate(notificationId, { read: true, seenAt: new Date() }, { new: true });
  }

  async delete(notificationId: string): Promise<void> {
    await Notification.findByIdAndDelete(notificationId);
  }
}