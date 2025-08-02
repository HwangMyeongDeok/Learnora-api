import { INotificationRepository } from "../../domain/notification/notification.repository.interface";

export class GetUserNotificationsUseCase {
  constructor(private repo: INotificationRepository) {}

  async execute(userId: string) {
    return await this.repo.findByUser(userId);
  }
}