import { StoreRepository } from '../domain/storeRepository';
import { CreateStoreRequest } from './createStoreRequest';
import { Store } from '../domain/store';
import { StoreId } from '../domain/storeId';
import { StoreName } from '../domain/storeName';
import { StoreAddress } from '../domain/storeAddress';
import { StorePhone } from '../domain/storePhone';

export default class StoreCreator {
  constructor(private readonly repository: StoreRepository) {}

  async run(request: CreateStoreRequest): Promise<void> {
    const existingByName = await this.repository.findByName(new StoreName(request.name));
    if (existingByName) {
      throw new Error(`Store with name ${request.name} already exists`);
    }

    const store = new Store(
      new StoreId(request.id),
      new StoreName(request.name),
      new StoreAddress(request.address),
      new StorePhone(request.phone)
    );

    await this.repository.save(store);
  }
}

