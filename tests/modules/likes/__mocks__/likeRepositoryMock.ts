import { LikeRepository } from '../../../../src/modules/likes/domain/likeRepository';
import { Like } from '../../../../src/modules/likes/domain/like';
import { LikeId } from '../../../../src/modules/likes/domain/likeId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class LikeRepositoryMock implements LikeRepository {
  private readonly mockSave = jest.fn();
  private readonly mockDelete = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByUserAndProductStore = jest.fn();
  private readonly mockCountByProductStore = jest.fn();

  async save(like: Like): Promise<void> {
    await this.mockSave(like);
  }

  async delete(id: LikeId): Promise<void> {
    await this.mockDelete(id);
  }

  async findById(id: LikeId): Promise<Nullable<Like>> {
    return await this.mockFindById(id);
  }

  async findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Like>> {
    return await this.mockFindByUserAndProductStore(userId, productId, storeId);
  }

  async countByProductStore(productId: ProductId, storeId: StoreId): Promise<number> {
    return await this.mockCountByProductStore(productId, storeId);
  }

  whenFindByIdReturn(like: Nullable<Like>): void {
    this.mockFindById.mockReturnValue(like);
  }

  whenFindByUserAndProductStoreReturn(like: Nullable<Like>): void {
    this.mockFindByUserAndProductStore.mockReturnValue(like);
  }

  whenCountByProductStoreReturn(count: number): void {
    this.mockCountByProductStore.mockReturnValue(count);
  }

  assertLastSavedLikeIs(expected: Like): void {
    const mock = this.mockSave.mock;
    const lastSaved = (mock.calls[mock.calls.length - 1] as Like[])[0];
    expect(lastSaved).toBeInstanceOf(Like);
    expect(lastSaved.id).toEqual(expected.id);
    expect(lastSaved.productId).toEqual(expected.productId);
    expect(lastSaved.storeId).toEqual(expected.storeId);
    expect(lastSaved.userId).toEqual(expected.userId);
  }

  assertLastDeletedLikeIdIs(expectedId: LikeId): void {
    const mock = this.mockDelete.mock;
    const lastDeletedId = (mock.calls[mock.calls.length - 1] as LikeId[])[0];
    expect(lastDeletedId).toEqual(expectedId);
  }
}
