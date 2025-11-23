import { IsString, IsOptional, IsArray, ValidateNested, IsUrl } from "class-validator";
import { Type } from "class-transformer";

class SocialLinkDto {
  @IsString()
  platform!: string;

  @IsUrl()
  url!: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkDto)
  socialLinks?: SocialLinkDto[];
}