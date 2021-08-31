import { User } from "src/users/users.model";

export default class UserClientDto {
  readonly name: string;
  readonly banned: boolean;
  readonly banReason: string | null;
  constructor(user: User) {
    this.name = user.name;
    this.banReason = user.banReason;
    this.banned = user.banned;
  }
}
