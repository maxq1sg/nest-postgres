import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export default class LoginUserDto {
  @IsString({ message: "should be at least 3" })
  readonly name: string;

  @IsString({ message: "should be at least 13" })
  readonly password: string;

}
