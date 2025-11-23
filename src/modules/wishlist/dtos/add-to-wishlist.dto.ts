import { IsMongoId, IsNotEmpty } from "class-validator";

export class AddToWishlistDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;
}