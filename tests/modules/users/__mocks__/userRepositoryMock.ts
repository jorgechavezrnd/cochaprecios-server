import { User } from '../../../../src/modules/users/domain/user';
import { UserRepository } from '../../../../src/modules/users/domain/userRepository';

export class UserRepositoryMock implements UserRepository {
  private readonly mockSave = jest.fn();

  async save(user: User): Promise<void> {
    await this.mockSave(user);
  }

  assertLastSavedUserIs(expected: User): void {
    const mock = this.mockSave.mock;
    const lastSavedUser = (mock.calls[mock.calls.length - 1] as User[])[0];
    expect(lastSavedUser).toBeInstanceOf(User);
    expect(lastSavedUser.id).toEqual(expected.id);
  }
}
