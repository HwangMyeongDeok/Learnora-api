import { UserModel } from "./user.model";
import { IUser, IUserRepository } from "./user.interface";

export class UserRepository implements IUserRepository {
  
  async create(data: any): Promise<IUser> {
    return await UserModel.create(data);
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id).select("-password").lean<IUser>();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email }).lean<IUser>();
  }

  async update(id: string, data: any): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true })
        .select("-password")
        .lean<IUser>();
  }

  async findAll(query: any): Promise<IUser[]> {
    const { page = 1, limit = 10, keyword } = query;
    const skip = (page - 1) * limit;
    
    const filter: any = {};
    if (keyword) {
        filter.$text = { $search: keyword };
    }

    return await UserModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-password")
        .lean<IUser[]>();
  }

  async countAll(query: any): Promise<number> {
    const { keyword } = query;
    const filter: any = {};
    if (keyword) filter.$text = { $search: keyword };
    
    return await UserModel.countDocuments(filter);
  }
}