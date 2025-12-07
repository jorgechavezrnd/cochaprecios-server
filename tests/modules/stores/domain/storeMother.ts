import { Store } from '../../../../src/modules/stores/domain/store';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { StoreName } from '../../../../src/modules/stores/domain/storeName';
import { StoreAddress } from '../../../../src/modules/stores/domain/storeAddress';
import { StorePhone } from '../../../../src/modules/stores/domain/storePhone';
import { UuidMother } from '../../shared/domain/uuidMother';

import { StoreCreatedAt } from '../../../../src/modules/stores/domain/storeCreatedAt';
import { StoreUpdatedAt } from '../../../../src/modules/stores/domain/storeUpdatedAt';

export class StoreMother {
  static create(
    id: StoreId,
    name: StoreName,
    address: StoreAddress,
    phone: StorePhone,
    createdAt?: StoreCreatedAt,
    updatedAt?: StoreUpdatedAt
  ): Store {
    return new Store(id, name, address, phone, createdAt, updatedAt);
  }

  static random(): Store {
    return this.create(
      new StoreId(UuidMother.random()),
      new StoreName('Supermercado Central'),
      new StoreAddress('Av. Principal #123'),
      new StorePhone('+591-444-555-666'),
      new StoreCreatedAt(new Date()),
      new StoreUpdatedAt(new Date())
    );
  }
}
