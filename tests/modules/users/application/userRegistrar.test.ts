import UserRegistrar from '../../../../src/modules/users/application/userRegistrar';
import { UserNameLengthExceeded } from '../../../../src/modules/users/domain/userNameLengthExceeded';
import { UserRepositoryMock } from '../__mocks__/userRepositoryMock';
import { UserMother } from '../domain/userMother';
import { CreateUserRequestMother } from './createUserRequestMother';

let repository: UserRepositoryMock;
let registrar: UserRegistrar;

beforeEach(() => {
  repository = new UserRepositoryMock();
  registrar = new UserRegistrar(repository);
});

describe('UserRegistrar', () => {
  it('should register a valid user', async () => {
    const request = CreateUserRequestMother.random();

    const user = UserMother.fromRequest(request);

    await registrar.run(request);

    repository.assertLastSavedUserIs(user);
  });

  it('should throw error if user name length is exceeded', async () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidRequest();

      const user = UserMother.fromRequest(request);

      registrar.run(request);

      repository.assertLastSavedUserIs(user);
    }).toThrow(UserNameLengthExceeded);
  });
});
