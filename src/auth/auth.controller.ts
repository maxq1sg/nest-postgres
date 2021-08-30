import { Body, Controller, Param, Post } from "@nestjs/common";
import CreateUserDto from "src/users/dto/create-user-dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post("/register")
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
