import { IUser } from "./user.interface";
import { User } from "./user.model";
import { IUserRepository } from "./user.interface"; 

export class UserRepository implements IUserRepository {
  
  async create(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).lean<IUser>();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email }).lean<IUser>();
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, user, { new: true })
        .lean<IUser>();
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id);
  }

  async findAll(): Promise<IUser[]> {
    return await User.find().lean<IUser[]>();
  }  
} 