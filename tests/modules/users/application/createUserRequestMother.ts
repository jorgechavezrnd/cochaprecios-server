import { CreateUserRequest } from '../../../../src/modules/users/application/createUserRequest';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { UserName } from '../../../../src/modules/users/domain/userName';
import { UserIdMother } from '../domain/userIdMother';
import { UserNameMother } from '../domain/userNameMother';

export class CreateUserRequestMother {
  static create(id: UserId, name: UserName): CreateUserRequest {
    return { id: id.value, name: name.value };
  }

  static random(): CreateUserRequest {
    return this.create(
      UserIdMother.random(),
      UserNameMother.random(),
    );
  }

  static invalidRequest(): CreateUserRequest {
    return {
      id: UserIdMother.random().value,
      name: UserNameMother.invalidName(),
    };
  }
}
