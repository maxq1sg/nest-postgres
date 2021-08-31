import { ValidationPipe } from "./../validation/JoiValidationPipe";
import { UsersService } from "./users.service";
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import CreateUserDto from "./dto/create-user-dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import JwtGuard from "src/auth/jwt-auth.guard";
import { ObjectSchema } from "joi";
import * as chalk from "chalk";
import LoginUserDto from "./dto/login.user.dto";

class CreateUser {
  name: string;
  password: string;
  roles?: string[];
}

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get("/")
  @ApiOperation({ summary: "Получение всех пользователей" })
  @ApiResponse({ status: 200, type: [User] })
  getUsers() {
    // return "maxim";
    return this.userService.getUsers();
  }

  @Get("/:id")
  @ApiOperation({ summary: "get single user" })
  @ApiResponse({ status: 200, type: User })
  getStingleUser(@Param("id") id: string) {
    return this.userService.getSingleUser(id);
  }
  @Delete("/:id")
  deleteUserById(@Param("id") id:number){
    return this.userService.deleteUserById(id)
  }

  @Post("/")
  @ApiOperation({ summary: "Создание пользователя" })
  @ApiResponse({ status: 200, type: User })
  createUser(@Body(new ValidationPipe()) dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
  @Get("/red/max")
  hello(@Query("page", new DefaultValuePipe(5), ParseIntPipe) page: number) {
    console.log(chalk.yellow(page + 121));
  }
  @Post("/login")
  login(dto:LoginUserDto){
    return this.userService
  }
}
