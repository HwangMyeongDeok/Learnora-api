import { Types } from "mongoose";
import { IUser } from "../user/user.interface";

export interface IAuthDocument extends Document {
  user: Types.ObjectId | IUser;
  token: string;
  device?: string;
  ip?: string;
  revoked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
