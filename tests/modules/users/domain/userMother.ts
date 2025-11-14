import { CreateUserRequest } from '../../../../src/modules/users/application/createUserRequest';
import { User } from '../../../../src/modules/users/domain/user';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { UserName } from '../../../../src/modules/users/domain/userName';
import { UserIdMother } from './userIdMother';
import { UserNameMother } from './userNameMother';

export class UserMother {
  static create(id: UserId, name: UserName): User {
    return new User(id, name);
  }

  static fromRequest(request: CreateUserRequest): User {
    return this.create(
      UserIdMother.create(request.id),
      UserNameMother.create(request.name),
    );
  }

  static random(): User {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
    );
  }
}
