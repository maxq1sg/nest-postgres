import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateUserDto from './dto/create-user-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags("Пользователи")
@Controller('/users')
export class UsersController {
    constructor(private userService:UsersService){}

    @Get("/")
    @ApiOperation({summary:"Получение всех пользователей"})
    @ApiResponse({status:200,type:[User]})
    getUsers(){
        return this.userService.getUsers()
    }

    @Get("/:id")
    @ApiOperation({summary:"get single user"})
    @ApiResponse({status:200,type:User})
    getStingleUser(@Param("id") id:number){
        return this.userService.getSingleUser(id)
    }


    @Post("/")
    @ApiOperation({summary:"Создание пользователя"})
    @ApiResponse({status:200,type:User})
    createUser(@Body() dto:CreateUserDto){
        return this.userService.createUser(dto)
    }
}
