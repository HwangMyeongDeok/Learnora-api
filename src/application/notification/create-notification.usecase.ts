import { INotification } from "../../domain/notification/notification.interface";
import { INotificationRepository } from "../../domain/notification/notification.repository";


export class CreateNotificationUseCase {
  constructor(private repo: INotificationRepository) {}

  async execute(data: Partial<INotification>) {
    return await this.repo.create(data);
  }
}