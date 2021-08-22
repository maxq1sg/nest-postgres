
import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserAndRoles } from 'src/roles/junc.model';
import { Role } from 'src/roles/roles.model';

interface UserCreationAttrs{
    name:string,
    password:string
}
@Table({tableName:"users"})
export class User extends Model<User,UserCreationAttrs> {
    @ApiProperty({example:"1",description:"идентификатор"})
    @Column({type:DataType.INTEGER,primaryKey:true,autoIncrement:true,unique:true})
    id:number

    @ApiProperty({example:"maxim",description:"имя еблана какого-то"})
    @Column({type:DataType.STRING,allowNull:false})
    name: string;

    @ApiProperty({example:"123456789",description:"надежный пароль"})
    @Column({type:DataType.STRING,allowNull:false})
    password: string;

    @ApiProperty({example:true,description:"забанен ли"})
    @Column({type:DataType.BOOLEAN,allowNull:false,defaultValue:false,})
    banned:boolean

    @ApiProperty({example:"потому что пидор",description:"причина бана"})
    @Column({type:DataType.STRING})
    banReason:string

    @BelongsToMany(()=>Role,()=>UserAndRoles)
    roles:Role[]

}