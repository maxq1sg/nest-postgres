import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import CreateRoleDto from './create-role-dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
      ) {}

      async createRole(dto:CreateRoleDto){
          const newRole = await this.roleModel.create(dto)
          return newRole
      }
      async getSingleRole(value:string){
        const role = this.roleModel.findOne({where:{value}})
        if(!role){
            throw new Error("such role doesn't exist")
        }
        return role
        }
      async getAllRoles(roles:string[]|string){
          const allRoles =await this.roleModel.findAll({where:{value:roles}})
          return allRoles  
      }

}
