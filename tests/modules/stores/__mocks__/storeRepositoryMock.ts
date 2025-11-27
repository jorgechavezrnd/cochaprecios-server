import { StoreRepository } from '../../../../src/modules/stores/domain/storeRepository';
import { Store } from '../../../../src/modules/stores/domain/store';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { StoreName } from '../../../../src/modules/stores/domain/storeName';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class StoreRepositoryMock implements StoreRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByName = jest.fn();
  private readonly mockFindAll = jest.fn();
  private readonly mockDelete = jest.fn();

  async save(store: Store): Promise<void> { await this.mockSave(store); }
  async findById(id: StoreId): Promise<Nullable<Store>> { return await this.mockFindById(id); }
  async findByName(name: StoreName): Promise<Nullable<Store>> { return await this.mockFindByName(name); }
  async findAll(): Promise<Store[]> { return await this.mockFindAll(); }
  async delete(id: StoreId): Promise<void> { await this.mockDelete(id); }

  assertLastSavedStoreIs(expected: Store): void {
    const lastSaved = (this.mockSave.mock.calls[this.mockSave.mock.calls.length - 1] as Store[])[0];
    expect(lastSaved).toBeInstanceOf(Store);
    expect(lastSaved.id).toEqual(expected.id);
  }

  whenFindByIdReturn(store: Nullable<Store>): void { this.mockFindById.mockReturnValue(store); }
  whenFindByNameReturn(store: Nullable<Store>): void { this.mockFindByName.mockReturnValue(store); }
  whenFindAllReturn(list: Store[]): void { this.mockFindAll.mockReturnValue(list); }

  assertDeletedWith(expected: StoreId): void {
    const lastDeleted = (this.mockDelete.mock.calls[this.mockDelete.mock.calls.length - 1] as StoreId[])[0];
    expect(lastDeleted).toEqual(expected);
  }
}
