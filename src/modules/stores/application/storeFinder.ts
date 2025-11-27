import { StoreRepository } from '../domain/storeRepository';
import { StoreId } from '../domain/storeId';

export default class StoreFinder {
  constructor(private readonly repository: StoreRepository) {}

  async run(id: string) {
    return this.repository.findById(new StoreId(id));
  }
}

