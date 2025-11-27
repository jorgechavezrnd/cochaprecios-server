import { StoreRepository } from '../domain/storeRepository';
import { StoreName } from '../domain/storeName';

export default class StoreSearcher {
  constructor(private readonly repository: StoreRepository) {}

  async run(params: { name?: string }) {
    if (params.name) {
      const found = await this.repository.findByName(new StoreName(params.name));
      return found ? [found] : [];
    }
    return this.repository.findAll();
  }
}

