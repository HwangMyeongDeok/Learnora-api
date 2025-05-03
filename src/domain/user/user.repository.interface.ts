import { IUser } from "./user.interface";

export interface IUserRepository {
  create(user: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void>;
  findAll(): Promise<IUser[]>;
}
