import { INotification, INotificationRepository } from "./notification.interface"; // Gộp interface

export class NotificationService {
  constructor(private readonly notificationRepo: INotificationRepository) {}

  // =================================================================
  // 1. CREATE NOTIFICATION (Lưu DB + Bắn Socket)
  // =================================================================
  async createNotification(data: Partial<INotification>) {
    // Bước 1: Lưu vào Database
    const notification = await this.notificationRepo.create(data);

    // Bước 2: [QUAN TRỌNG] Gửi Real-time qua Socket.io
    // Tech Lead Note: Đây là chỗ bạn gọi Socket Service
    // global.io.to(data.userId).emit('new_notification', notification);
    
    return notification;
  }

  // =================================================================
  // 2. GET USER NOTIFICATIONS (Lấy danh sách)
  // =================================================================
  async getUserNotifications(userId: string) {
    // Tech Lead Note: Nên implement thêm Phân trang (Pagination)
    // Vì user có thể có hàng ngàn thông báo, load hết sẽ sập app.
    return await this.notificationRepo.findByUser(userId);
  }

  // =================================================================
  // 3. MARK AS READ (Đánh dấu đã đọc)
  // =================================================================
  async markAsRead(notificationId: string) {
    return await this.notificationRepo.markAsRead(notificationId);
  }
  
  // [BONUS] MARK ALL AS READ (Tính năng thường thấy)
  /*
  async markAllAsRead(userId: string) {
      return await this.notificationRepo.markAllAsRead(userId);
  }
  */

  // =================================================================
  // 4. DELETE (Xóa thông báo)
  // =================================================================
  async deleteNotification(notificationId: string): Promise<void> {
    await this.notificationRepo.delete(notificationId);
  }
}