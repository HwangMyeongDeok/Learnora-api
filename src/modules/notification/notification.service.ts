import { INotificationRepository } from "./notification.interface";
import { NotFoundError } from "../../core/error.response";

export class NotificationService {
  constructor(private readonly notificationRepo: INotificationRepository) {}

  async pushNotification(data: any) {
    return await this.notificationRepo.create(data);
  }

  async getMyNotifications(userId: string, query: any) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 20;

    const [notifications, unreadCount] = await Promise.all([
        this.notificationRepo.findByUser(userId, page, limit),
        this.notificationRepo.countUnread(userId)
    ]);

    return {
        notifications,
        unreadCount,
        page,
        limit
    };
  }

  async markRead(userId: string, notificationId: string) {
    const updated = await this.notificationRepo.markAsRead(notificationId, userId);
    if (!updated) throw new NotFoundError("Notification not found");
    return updated;
  }

  async markAllRead(userId: string) {
    await this.notificationRepo.markAllAsRead(userId);
  }
}