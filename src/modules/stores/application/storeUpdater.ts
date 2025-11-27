import { StoreRepository } from '../domain/storeRepository';
import { StoreId } from '../domain/storeId';
import { StoreName } from '../domain/storeName';
import { StoreAddress } from '../domain/storeAddress';
import { StorePhone } from '../domain/storePhone';

export interface UpdateStoreRequest {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export default class StoreUpdater {
  constructor(private readonly repository: StoreRepository) {}

  async run(request: UpdateStoreRequest): Promise<void> {
    const existing = await this.repository.findById(new StoreId(request.id));
    if (!existing) throw new Error(`Store with id ${request.id} does not exist`);

    const existingByName = await this.repository.findByName(new StoreName(request.name));
    if (existingByName && existingByName.id.value !== request.id) {
      throw new Error(`Store with name ${request.name} already exists`);
    }

    existing.name = new StoreName(request.name);
    existing.address = new StoreAddress(request.address);
    existing.phone = new StorePhone(request.phone);
    existing.updatedAt = new Date();

    await this.repository.save(existing);
  }
}
