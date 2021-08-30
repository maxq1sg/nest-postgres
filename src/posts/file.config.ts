import { nanoid } from "nanoid";
import * as path from "path";
import * as chalk from "chalk";

export function editFileName(req, file, callback) {
  console.log(chalk.yellow(file.originalName));

  const name = file.originalname.split(".")[0];
  const fileExtName = path.extname(file.originalname);
  console.log(`${name}-${nanoid(5)}${fileExtName}`);
  callback(null, `${name}-${nanoid(5)}${fileExtName}`);
}
