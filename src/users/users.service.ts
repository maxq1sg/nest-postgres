import { RolesService } from "./../roles/roles.service";
import { Injectable, UsePipes } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import CreateUserDto from "./dto/create-user-dto";
import { User } from "./users.model";
import { Role } from "src/roles/roles.model";
import { Post } from "src/posts/posts.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private roleService: RolesService
  ) {}

  async createUser(dtoData: CreateUserDto) {
    const data = await this.userModel.create(dtoData);
    const roles = await this.roleService.getAllRoles(dtoData.roles || "USER");
    console.log(JSON.stringify(roles));
    await data.$set("roles", roles);
    data.roles = roles;
    return data;
  }
  async getUsers() {
    const data = await this.userModel.findAll({ include: { model: Role } });
    return data;
  }
  async getSingleUser(name: string) {
    console.log(name);
    const data = await this.userModel.findOne({
      where: { name },
      include: { model: Post },
    });
    return data;
  }
  async deleteUserById(id: number) {
    return await this.userModel.destroy({ where: { id } });
  }
}
