import StoreUpdater from '../../../../src/modules/stores/application/storeUpdater';
import { StoreRepositoryMock } from '../__mocks__/storeRepositoryMock';
import { StoreMother } from '../domain/storeMother';

describe('StoreUpdater', () => {
  let repository: StoreRepositoryMock;
  let updater: StoreUpdater;

  beforeEach(() => {
    repository = new StoreRepositoryMock();
    updater = new StoreUpdater(repository);
  });

  it('should update an existing store', async () => {
    const store = StoreMother.random();
    repository.whenFindByIdReturn(store);
    repository.whenFindByNameReturn(null);

    await updater.run({
      id: store.id.value,
      name: 'Supermercado Central 2',
      address: 'Av. Principal #124',
      phone: '+591-777-888-999',
    });

    const updated = StoreMother.create(store.id, new (store.name.constructor as any)('Supermercado Central 2'), new (store.address.constructor as any)('Av. Principal #124'), new (store.phone.constructor as any)('+591-777-888-999'));
    repository.assertLastSavedStoreIs(updated);
  });
});
