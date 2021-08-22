import { RolesService } from './../roles/roles.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateUserDto from './dto/create-user-dto';
import { User } from './users.model';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
        private roleService:RolesService
      ) {}
    async createUser(dtoData:CreateUserDto){
        const data = await this.userModel.create(dtoData)
        const roles = await this.roleService.getAllRoles(dtoData.roles)
        console.log(JSON.stringify(roles))
        await data.$set("roles",roles)
        return data
    }
    async getUsers(){
        const data= await this.userModel.findAll()
        return data
    }
    async getSingleUser(id:number){
        const data = await this.userModel.findByPk(id,{include:{model:Role}})
        return data
    }
}
