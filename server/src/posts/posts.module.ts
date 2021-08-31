import { AuthModule } from './../auth/auth.module';
import { FilesModule } from "./../files/files.module";
import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Post } from "./posts.model";

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    FilesModule,
    SequelizeModule.forFeature([Post]),
    AuthModule
  ],
})
export class PostsModule {}
