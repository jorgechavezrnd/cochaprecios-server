import StoreDeleter from '../../../../src/modules/stores/application/storeDeleter';
import { StoreRepositoryMock } from '../__mocks__/storeRepositoryMock';
import { StoreMother } from '../domain/storeMother';

describe('StoreDeleter', () => {
  let repository: StoreRepositoryMock;
  let deleter: StoreDeleter;

  beforeEach(() => {
    repository = new StoreRepositoryMock();
    deleter = new StoreDeleter(repository);
  });

  it('should delete an existing store', async () => {
    const store = StoreMother.random();
    repository.whenFindByIdReturn(store);
    await deleter.run(store.id.value);
    repository.assertDeletedWith(store.id);
  });

  it('should throw if store does not exist', async () => {
    repository.whenFindByIdReturn(null);
    await expect(deleter.run('8899AABB-CCDD-4EE1-8FF2-0123456789AB')).rejects.toThrow(
      'Store with id 8899AABB-CCDD-4EE1-8FF2-0123456789AB does not exist'
    );
  });
});

