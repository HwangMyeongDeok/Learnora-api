import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IAuthDocument extends Document {
  user: Types.ObjectId | IUser;
  token: string;
  deviceId?: string;
  ip?: string;
  replacedByToken?: string;
  revoked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
