import { IsMongoId, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCertificateDto {
  @IsNotEmpty()
  @IsMongoId()
  courseId!: string;

  @IsNotEmpty()
  @IsString()
  certificateUrl!: string;
}