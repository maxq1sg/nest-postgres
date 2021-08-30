import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { getFieldDef } from "graphql/execution/execute";

@Injectable()
export default class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    try {
      // const requiredRoles = this.reflector.getAllAndOverride("")
      const authHeader = req.headers.authorization;
      const [type, token] = authHeader.split(" ");
      if (type !== "Bearer" || !token) {
        throw new UnauthorizedException("Пользователь не авторизован");
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }
  }
}
