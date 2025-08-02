import { INotificationRepository } from "../../domain/notification/notification.repository.interface";

export class DeleteNotificationUseCase {
  constructor(private repo: INotificationRepository) {}

  async execute(notificationId: string): Promise<void> {
    return await this.repo.delete(notificationId);
  }
}