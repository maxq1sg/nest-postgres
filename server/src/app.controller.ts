import { Controller, Get } from "@nestjs/common";
import AppService from "./app.service";

@Controller("/")
export default class AppController {
  // constructor(private appService:AppService){}

  @Get("/huy")
  getUsers() {
    return "hello";
  }
}
