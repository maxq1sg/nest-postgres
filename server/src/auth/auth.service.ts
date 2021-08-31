import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { RolesService } from "src/roles/roles.service";
import CreateUserDto from "src/users/dto/create-user-dto";
import { User } from "src/users/users.model";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private roleService: RolesService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }
  async registration(userDto: CreateUserDto) {
    const user = await this.userService.getSingleUser(userDto.name);
    if (user) {
      throw new HttpException(
        "such user already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 5);
    const newUser = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(newUser);
  }
  private async generateToken(user: User) {
    const payload = { id: user.id, roles: user.roles, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(user: CreateUserDto) {
    const userInDb = await this.userService.getSingleUser(user.name);
    const isPasswordCorrect = await bcrypt.compare(
      user.password,
      userInDb?.password||""
    );

    if (userInDb && isPasswordCorrect) {
      return userInDb;
    }
    throw new UnauthorizedException("incorrect name or password");
  }
}
