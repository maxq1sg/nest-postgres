import { ApiProperty } from "@nestjs/swagger"

export default class CreateRoleDto{
    @ApiProperty({example:"admin",description:"role name"})
    readonly value:string

    @ApiProperty({example:"main admin role",description:"desc"})
    readonly description:string
}