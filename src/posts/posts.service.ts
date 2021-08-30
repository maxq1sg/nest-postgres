import { CreatePostDto } from "./create.post.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Post } from "./posts.model";
import { FilesService } from "src/files/files.service";
import * as chalk from "chalk";
import { User } from "src/users/users.model";
import { File } from "src/files/file.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    private fileService: FilesService
  ) {}

  async createPost(dto: CreatePostDto, files: string[]) {
    const newPost = await Post.create(dto);
    const modifiedPaths = files.map((item) => ({
      path: item,
      post_id: newPost.id,
    }));
    const fileInstances = await this.fileService.createFiles(modifiedPaths);

    return { newPost, fileInstances };
  }
  async deletePostById(id: number) {
    return await this.postModel.destroy({ where: { id } });
  }
  async getAllPosts() {
    return this.postModel.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["createdAt", "password", "updatedAt"] },
        },
        {
          model: File,
          attributes: { exclude: ["id", "post_id"] },
        },
      ],
    });
  }
}
