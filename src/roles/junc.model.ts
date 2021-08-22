
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { User } from 'src/users/users.model';

@Table({tableName:"users_and_roles"})
export class UserAndRoles extends Model<UserAndRoles> {
    @ApiProperty({example:1,description:"идентификатор"})
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number

    @ApiProperty({example:1,description:"id of user"})
    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER,allowNull:false})
    userId: number;

    @ForeignKey(()=>Role)

    @ApiProperty({example:1,description:"id of role"})
    @Column({type:DataType.INTEGER,allowNull:false})
    roleId: number;
}