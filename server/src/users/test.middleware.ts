import { NestMiddleware } from "@nestjs/common";
import * as chalk from "chalk";
export class UserMiddleware implements NestMiddleware {
  async use(req, res, next) {
    console.log(chalk.yellow("inside user middleare"));
    next();
  }
}
