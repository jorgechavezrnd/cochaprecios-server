import { User } from '../domain/user';
import { UserId } from '../domain/userId';
import { UserName } from '../domain/userName';
import { UserRepository } from '../domain/userRepository';
import { CreateUserRequest } from './createUserRequest';

export default class UserRegistrar {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run(request: CreateUserRequest): Promise<void> {
    const user = new User(
      new UserId(request.id),
      new UserName(request.name),
    );

    await this.repository.save(user);
  }
}
