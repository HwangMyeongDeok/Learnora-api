import { IUserRepository } from "../../../domain/user/user.repository.interface";
import { IUser } from "../../../domain/user/user.interface";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async findAll(): Promise<IUser[]> {
    return await User.find();
  }  
}
