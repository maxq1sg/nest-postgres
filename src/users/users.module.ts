import { AuthModule } from "./../auth/auth.module";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserAndRoles } from "src/roles/junc.model";
import { Role } from "src/roles/roles.model";
import { RolesModule } from "src/roles/roles.module";
import { UsersController } from "./users.controller";
import { User } from "./users.model";
import { UsersService } from "./users.service";
import { UserMiddleware } from "./test.middleware";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserAndRoles]),
    RolesModule,
    AuthModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(UsersController);
  }
}
