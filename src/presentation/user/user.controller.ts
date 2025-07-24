import { Request, Response } from "express";
import { GetUserUseCase } from "../../application/user/get-user.usecase";
import { UpdateUserUseCase } from "../../application/user/update-user.usecase";
import { DeleteUserUseCase } from "../../application/user/delete-user.usecase";
import { CreateUserUseCase } from "../../application/user/create-user.usecase";
import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import ErrorHandler from "../../middleware/ErrorHandler";

const userRepo = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepo);
const getUserUseCase = new GetUserUseCase(userRepo);
const updateUserUseCase = new UpdateUserUseCase(userRepo);
const deleteUserUseCase = new DeleteUserUseCase(userRepo);

export const createUserController = async (req: Request, res: Response) => {
  const user = await createUserUseCase.execute(req.body);
  res.status(201).json(user);
};

export const getAllUsersController = async (_: Request, res: Response) => {
  const users = await getUserUseCase.findAll();
  res.json(users);
};

export const getUserByIdController = async (req: Request, res: Response) => {
  const user = await getUserUseCase.findById(req.params.id);
  if (!user) throw new ErrorHandler("User not found", 404);
  res.json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const updated = await updateUserUseCase.execute(req.params.id, req.body);
  if (!updated) throw new ErrorHandler("User not found", 404);
  res.json(updated);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUserUseCase.execute(req.params.id);
  res.status(204).send();
};
