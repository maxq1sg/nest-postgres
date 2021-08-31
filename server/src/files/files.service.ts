import { CreateFileDto } from "./../posts/create.file.dto";
import { Injectable, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "./file.model";
import { promises as fsPromises } from "fs";
import { join } from "path";

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File)
    private fileModel: typeof File
  ) {}
  async createFiles(dto: CreateFileDto[]) {
    const newFiles = await this.fileModel.bulkCreate(dto);
    return newFiles;
  }
  async deleteFilesFromStorage(files: string[]) {
    return Promise.all(
      files.map((file) =>
        fsPromises.unlink(join(__dirname, "..", "..", "uploads", file))
      )
    );
  }
}
