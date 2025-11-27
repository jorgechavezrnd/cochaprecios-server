import { StoreRepository } from '../domain/storeRepository';
import { StoreId } from '../domain/storeId';

export default class StoreDeleter {
  constructor(private readonly repository: StoreRepository) {}

  async run(id: string): Promise<void> {
    const store = await this.repository.findById(new StoreId(id));
    if (!store) throw new Error(`Store with id ${id} does not exist`);
    await this.repository.delete(new StoreId(id));
  }
}

