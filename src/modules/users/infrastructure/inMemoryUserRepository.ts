import { User } from '../domain/user';
import { UserRepository } from '../domain/userRepository';

export class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
