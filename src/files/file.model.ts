import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { UserAndRoles } from "src/roles/junc.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";
import { Post } from "../posts/posts.model";

interface FileCreationAttrs {
  path: string;
}

@Table({ tableName: "files", createdAt: false, updatedAt: false })
export class File extends Model<File, FileCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  path: string;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  post_id: number;
}
