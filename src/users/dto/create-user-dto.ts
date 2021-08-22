import { ApiProperty } from "@nestjs/swagger"

export default class CreateUserDto{
    @ApiProperty({example:"maxim",description:"your name"})
    readonly name:string

    @ApiProperty({example:"1231243534",description:"your password"})
    readonly password:string

    @ApiProperty({example:["ADMIN","EBLAN"],description:"your password"})
    readonly roles:string[]
}