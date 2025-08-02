import { INotificationRepository } from "../../domain/notification/notification.repository.interface";

export class MarkNotificationReadUseCase {
  constructor(private repo: INotificationRepository) {}

  async execute(notificationId: string) {
    return await this.repo.markAsRead(notificationId);
  }
}