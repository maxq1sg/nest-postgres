import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { File } from "./file.model";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [SequelizeModule.forFeature([File])],
})
export class FilesModule {}
