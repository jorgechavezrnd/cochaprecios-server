import { Store } from '../../../../src/modules/stores/domain/store';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { StoreName } from '../../../../src/modules/stores/domain/storeName';
import { StoreAddress } from '../../../../src/modules/stores/domain/storeAddress';
import { StorePhone } from '../../../../src/modules/stores/domain/storePhone';
import { UuidMother } from '../../shared/domain/uuidMother';

export class StoreMother {
  static create(id: StoreId, name: StoreName, address: StoreAddress, phone: StorePhone): Store {
    return new Store(id, name, address, phone);
  }

  static random(): Store {
    return this.create(
      new StoreId(UuidMother.random()),
      new StoreName('Supermercado Central'),
      new StoreAddress('Av. Principal #123'),
      new StorePhone('+591-444-555-666')
    );
  }
}
