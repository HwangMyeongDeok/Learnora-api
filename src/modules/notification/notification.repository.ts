import { NotificationModel } from "./notification.model";
import { INotification, INotificationRepository } from "./notification.interface";

export class NotificationRepository implements INotificationRepository {
  
  async create(data: any): Promise<INotification> {
    return await NotificationModel.create(data);
  }

  async findByUser(userId: string, page: number, limit: number): Promise<INotification[]> {
    const skip = (page - 1) * limit;
    return await NotificationModel.find({ user: userId })
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit)
      .lean<INotification[]>();
  }

  async countUnread(userId: string): Promise<number> {
    return await NotificationModel.countDocuments({ user: userId, read: false });
  }

  async markAsRead(id: string, userId: string): Promise<INotification | null> {
    return await NotificationModel.findOneAndUpdate(
        { _id: id, user: userId }, 
        { read: true, seenAt: new Date() },
        { new: true }
    ).lean<INotification>();
  }

  async markAllAsRead(userId: string): Promise<void> {
    await NotificationModel.updateMany(
        { user: userId, read: false },
        { read: true, seenAt: new Date() }
    );
  }
}