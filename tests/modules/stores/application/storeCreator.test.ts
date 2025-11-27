import StoreCreator from '../../../../src/modules/stores/application/storeCreator';
import { StoreRepositoryMock } from '../__mocks__/storeRepositoryMock';
import { StoreMother } from '../domain/storeMother';

describe('StoreCreator', () => {
  let repository: StoreRepositoryMock;
  let creator: StoreCreator;

  beforeEach(() => {
    repository = new StoreRepositoryMock();
    creator = new StoreCreator(repository);
  });

  it('should create a new store', async () => {
    const store = StoreMother.random();
    repository.whenFindByNameReturn(null);
    await creator.run({
      id: store.id.value,
      name: store.name.value,
      address: store.address.value,
      phone: store.phone.value,
    });
    repository.assertLastSavedStoreIs(store);
  });
});
