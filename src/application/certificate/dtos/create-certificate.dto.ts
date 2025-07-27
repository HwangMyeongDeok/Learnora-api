import { IsString } from "class-validator";

export class CreateCertificateDto {
  @IsString()
  user!: string;

  @IsString()
  course!: string;

  @IsString()
  certificateUrl!: string;
}