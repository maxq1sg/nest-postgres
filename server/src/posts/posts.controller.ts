import { PostsService } from "./posts.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "./file.config";
import { extname } from "path";
import { CreatePostDto } from "./create.post.dto";
import * as chalk from "chalk";
import JwtGuard from "src/auth/jwt-auth.guard";

@Controller("posts")
export class PostsController {
  constructor(private postService: PostsService) {}

  @Get("/")
  @UseGuards(JwtGuard)
  getAllPosts() {
    console.log("receibed");
    return this.postService.getAllPosts();
  }
  @Delete("/:id")
  @UseGuards(JwtGuard)
  async deletePostById(@Param("id") id: number) {
    const hasDeleted = await this.postService.deletePostById(id);
    return { deleted: Boolean(hasDeleted) };
  }

  @Post("/new")
  @UseGuards(JwtGuard)
  @UseInterceptors(
    FilesInterceptor("files", 100, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(6)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    })
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreatePostDto
  ) {
    const filePaths: string[] = [];
    files.forEach((file) => {
      const fileReponse = file.filename;
      filePaths.push(fileReponse);
    });
    console.log(chalk.blue(JSON.stringify(filePaths)));
    const newPost = await this.postService.createPost(dto, filePaths);

    return newPost;
  }
}
