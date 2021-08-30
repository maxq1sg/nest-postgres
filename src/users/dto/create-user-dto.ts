import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class CreateUserDto {
  @ApiProperty({ example: "maxim", description: "your name" })
  @IsString({ message: "should be at least 3" })
  readonly name: string;

  @IsString({ message: "should be at least 13" })
  @ApiProperty({ example: "1231243534", description: "your password" })
  readonly password: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ example: ["ADMIN", "EBLAN"], description: "your password" })
  readonly roles: string[];
}
