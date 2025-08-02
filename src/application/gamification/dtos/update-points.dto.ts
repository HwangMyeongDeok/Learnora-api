import { IsInt, Min } from "class-validator";

export class UpdatePointsDto {
  @IsInt()
  @Min(0)
  points!: number;
}