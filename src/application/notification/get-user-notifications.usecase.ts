import { INotificationRepository } from "../../domain/notification/notification.repository";

export class GetUserNotificationsUseCase {
  constructor(private repo: INotificationRepository) {}

  async execute(userId: string) {
    return await this.repo.findByUser(userId);
  }
}