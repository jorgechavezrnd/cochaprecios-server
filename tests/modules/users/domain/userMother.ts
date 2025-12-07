import { CreateUserRequest } from '../../../../src/modules/users/application/createUserRequest';
import { User } from '../../../../src/modules/users/domain/user';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { UserName } from '../../../../src/modules/users/domain/userName';
import { UserUsername } from '../../../../src/modules/users/domain/userUsername';
import { UserEmail } from '../../../../src/modules/users/domain/userEmail';
import { UserPassword } from '../../../../src/modules/users/domain/userPassword';
import { UserRole } from '../../../../src/modules/users/domain/userRole';
import { UserIdMother } from './userIdMother';
import { UserNameMother } from './userNameMother';
import { UserUsernameMother } from './userUsernameMother';
import { UserEmailMother } from './userEmailMother';
import { UserPasswordMother } from './userPasswordMother';
import { UserRoleMother } from './userRoleMother';

import { UserCreatedAt } from '../../../../src/modules/users/domain/userCreatedAt';
import { UserUpdatedAt } from '../../../../src/modules/users/domain/userUpdatedAt';

export class UserMother {
  static create(
    id: UserId,
    name: UserName,
    username: UserUsername,
    email: UserEmail,
    password: UserPassword,
    role: UserRole,
    createdAt?: UserCreatedAt,
    updatedAt?: UserUpdatedAt,
  ): User {
    return new User(id, name, username, email, password, role, createdAt, updatedAt);
  }

  static fromRequest(request: CreateUserRequest): User {
    return this.create(
      UserIdMother.create(request.id),
      UserNameMother.create(request.name),
      UserUsernameMother.create(request.username),
      UserEmailMother.create(request.email),
      UserPasswordMother.create(request.password),
      UserRoleMother.create(request.role),
    );
  }

  static random(): User {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
      UserUsernameMother.random(),
      UserEmailMother.random(),
      UserPasswordMother.random(),
      UserRoleMother.random(),
      new UserCreatedAt(new Date()),
      new UserUpdatedAt(new Date()),
    );
  }
}
