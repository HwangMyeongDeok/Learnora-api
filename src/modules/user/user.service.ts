import { IUserRepository } from "./user.interface";
import { NotFoundError } from "../../core/error.response";

export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  async getMyProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async updateProfile(userId: string, data: any) {
    const allowedUpdates = {
        name: data.name,
        avatar: data.avatar,
        bio: data.bio,
        socialLinks: data.socialLinks
    };

    Object.keys(allowedUpdates).forEach(key => 
        (allowedUpdates as any)[key] === undefined && delete (allowedUpdates as any)[key]
    );

    const updatedUser = await this.userRepo.update(userId, allowedUpdates);
    if (!updatedUser) throw new NotFoundError("User not found");
    
    return updatedUser;
  }
}