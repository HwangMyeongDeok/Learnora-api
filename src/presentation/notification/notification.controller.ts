import { Request, Response } from "express";
import { NotificationRepository } from "../../infrastructure/database/repositories/notification.repository";
import { CreateNotificationUseCase } from "../../application/notification/create-notification.usecase";
import { GetUserNotificationsUseCase } from "../../application/notification/get-user-notifications.usecase";
import { MarkNotificationReadUseCase } from "../../application/notification/mark-notification-read.usecase";
import { DeleteNotificationUseCase } from "../../application/notification/delete-notification.usecase";

const repo = new NotificationRepository();

export const createNotification = async (req: Request, res: Response) => {
  const usecase = new CreateNotificationUseCase(repo);
  const result = await usecase.execute(req.body);
  res.status(201).json(result);
};

export const getUserNotifications = async (req: Request, res: Response) => {
  const usecase = new GetUserNotificationsUseCase(repo);
  const result = await usecase.execute(req.user!.userId);
  res.status(200).json(result);
};

export const markNotificationRead = async (req: Request, res: Response) => {
  const usecase = new MarkNotificationReadUseCase(repo);
  const result = await usecase.execute(req.params.id);
  res.status(200).json(result);
};

export const deleteNotification = async (req: Request, res: Response) => {
  const usecase = new DeleteNotificationUseCase(repo);
  await usecase.execute(req.params.id);
  res.status(204).send();
};