import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserAndRoles } from "./junc.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}
@Table({ tableName: "roles", createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: 1, description: "идентификатор" })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: "maxim", description: "name of the role" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @ApiProperty({ example: "123456789", description: "надежный пароль" })
  @Column({ type: DataType.STRING, defaultValue: "some desc" })
  description: string;

  @BelongsToMany(() => User, () => UserAndRoles)
  users: User[];
}
