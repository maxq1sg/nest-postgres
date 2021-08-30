import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { UserAndRoles } from "src/roles/junc.model";
import { Role } from "src/roles/roles.model";
import { User } from "src/users/users.model";
import { File } from "../files/file.model";

interface PostCreationAttrs {
  body: string;
  static?: string[];
}
@Table({ tableName: "posts", createdAt: false, updatedAt: false })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  body: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @HasMany(() => File)
  files: File[];
}
