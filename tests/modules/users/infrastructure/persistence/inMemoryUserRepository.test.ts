import InMemoryUserRepository from '../../../../../src/modules/users/infrastructure/persistence/inMemoryUserRepository';
import { UserMother } from '../../domain/userMother';

describe('InMemoryUserRepository', () => {

  it('should save a user', async () => {
    const repository = new InMemoryUserRepository();
    const expectedUser = UserMother.random();

    await repository.save(expectedUser);

    const user = await repository.search(expectedUser.id.value);
    expect(user).toEqual(expectedUser);
  });

});
