import UserCreator from '../../../../src/modules/users/application/userCreator';
import { UserNameLengthExceeded } from '../../../../src/modules/users/domain/userNameLengthExceeded';
import { UserRepositoryMock } from '../__mocks__/userRepositoryMock';
import { UserMother } from '../domain/userMother';
import { CreateUserRequestMother } from './createUserRequestMother';

let repository: UserRepositoryMock;
let creator: UserCreator;

beforeEach(() => {
  repository = new UserRepositoryMock();
  creator = new UserCreator(repository);
});

describe('UserCreator', () => {
  it('should create a valid user', async () => {
    const request = CreateUserRequestMother.random();

    const user = UserMother.fromRequest(request);

    await creator.run(request);

    repository.assertLastSavedUserIs(user);
  });

  it('should throw error if user name length is exceeded', async () => {
    expect(() => {
      const request = CreateUserRequestMother.invalidRequest();

      const user = UserMother.fromRequest(request);

      creator.run(request);

      repository.assertLastSavedUserIs(user);
    }).toThrow(UserNameLengthExceeded);
  });
});
