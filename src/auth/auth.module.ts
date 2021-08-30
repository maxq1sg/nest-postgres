import { forwardRef } from "@nestjs/common";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Role } from "src/roles/roles.model";
import { RolesModule } from "src/roles/roles.module";
import { User } from "src/users/users.model";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    SequelizeModule.forFeature([User, Role]),
    forwardRef(() => UsersModule),
    RolesModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || "maximka",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
