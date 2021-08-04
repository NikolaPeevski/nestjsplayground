import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(user: User): User | undefined {
    if (this.isUniqueName(user.name)) {
      this.users.push(user);
      return { id: this.users.indexOf(user), ...user };
    }
  }

  findAll(): User[] {
    return this.users.map((user, id) => <User>{ id, ...user });
  }

  findOne(id: number): User | undefined {
    return this.users[id];
  }

  private isUniqueName(userName: string): boolean {
    return this.users.every(({ name }) => name !== userName);
  }
}
