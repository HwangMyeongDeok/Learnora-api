import { IsMongoId, IsNotEmpty } from "class-validator";

export class AddToCartDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;
}