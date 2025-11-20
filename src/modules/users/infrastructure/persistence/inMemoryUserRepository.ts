import { User } from '../../domain/user';
import { UserRepository } from '../../domain/userRepository';

export default class InMemoryUserRepository implements UserRepository {
  private readonly users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async search(userId: string): Promise<User> {
    const user = this.users.find(u => u.id.value === userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }
}
