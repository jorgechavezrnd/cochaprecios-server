import { FavoriteRepository } from '../../../../src/modules/favorites/domain/favoriteRepository';
import { Favorite } from '../../../../src/modules/favorites/domain/favorite';
import { FavoriteId } from '../../../../src/modules/favorites/domain/favoriteId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class FavoriteRepositoryMock implements FavoriteRepository {
  private readonly mockSave = jest.fn();
  private readonly mockDelete = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByUserAndProductStore = jest.fn();
  private readonly mockFindByUser = jest.fn();

  async save(favorite: Favorite): Promise<void> {
    await this.mockSave(favorite);
  }

  async delete(id: FavoriteId): Promise<void> {
    await this.mockDelete(id);
  }

  async findById(id: FavoriteId): Promise<Nullable<Favorite>> {
    return await this.mockFindById(id);
  }

  async findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Favorite>> {
    return await this.mockFindByUserAndProductStore(userId, productId, storeId);
  }

  async findByUser(userId: UserId): Promise<Favorite[]> {
    return await this.mockFindByUser(userId);
  }

  whenFindByIdReturn(favorite: Nullable<Favorite>): void {
    this.mockFindById.mockReturnValue(favorite);
  }

  whenFindByUserAndProductStoreReturn(favorite: Nullable<Favorite>): void {
    this.mockFindByUserAndProductStore.mockReturnValue(favorite);
  }

  whenFindByUserReturn(favorites: Favorite[]): void {
    this.mockFindByUser.mockReturnValue(favorites);
  }

  assertLastSavedFavoriteIs(expected: Favorite): void {
    const mock = this.mockSave.mock;
    const lastSaved = (mock.calls[mock.calls.length - 1] as Favorite[])[0];
    expect(lastSaved).toBeInstanceOf(Favorite);
    expect(lastSaved.id).toEqual(expected.id);
    expect(lastSaved.productId).toEqual(expected.productId);
    expect(lastSaved.storeId).toEqual(expected.storeId);
    expect(lastSaved.userId).toEqual(expected.userId);
  }

  assertLastDeletedFavoriteIdIs(expectedId: FavoriteId): void {
    const mock = this.mockDelete.mock;
    const lastDeletedId = (mock.calls[mock.calls.length - 1] as FavoriteId[])[0];
    expect(lastDeletedId).toEqual(expectedId);
  }
}
