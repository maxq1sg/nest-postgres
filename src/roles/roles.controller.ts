import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import CreateRoleDto from "./create-role-dto";
import { RolesService } from "./roles.service";

@Controller("/roles")
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Get("/:value")
  getSingleRole(@Param("value") value: string) {
    return this.roleService.getSingleRole(value);
  }

  @Post("/")
  createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }
}
