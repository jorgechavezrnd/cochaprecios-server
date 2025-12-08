import { CommentRepository } from '../../../../src/modules/comments/domain/commentRepository';
import { Comment } from '../../../../src/modules/comments/domain/comment';
import { CommentId } from '../../../../src/modules/comments/domain/commentId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class CommentRepositoryMock implements CommentRepository {
  private readonly mockSave = jest.fn();
  private readonly mockDelete = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByProductAndStore = jest.fn();

  async save(comment: Comment): Promise<void> {
    await this.mockSave(comment);
  }

  async delete(id: CommentId): Promise<void> {
    await this.mockDelete(id);
  }

  async findById(id: CommentId): Promise<Nullable<Comment>> {
    return await this.mockFindById(id);
  }

  async findByProductAndStore(productId: ProductId, storeId: StoreId): Promise<Comment[]> {
    return await this.mockFindByProductAndStore(productId, storeId);
  }

  whenFindByIdReturn(comment: Nullable<Comment>): void {
    this.mockFindById.mockReturnValue(comment);
  }

  whenFindByProductAndStoreReturn(comments: Comment[]): void {
    this.mockFindByProductAndStore.mockReturnValue(comments);
  }

  assertLastSavedCommentIs(expected: Comment): void {
    const mock = this.mockSave.mock;
    const lastSaved = (mock.calls[mock.calls.length - 1] as Comment[])[0];
    expect(lastSaved).toBeInstanceOf(Comment);
    expect(lastSaved.id).toEqual(expected.id);
    expect(lastSaved.productId).toEqual(expected.productId);
    expect(lastSaved.storeId).toEqual(expected.storeId);
    expect(lastSaved.userId).toEqual(expected.userId);
    expect(lastSaved.content).toEqual(expected.content);
  }

  assertLastDeletedCommentIdIs(expectedId: CommentId): void {
    const mock = this.mockDelete.mock;
    const lastDeletedId = (mock.calls[mock.calls.length - 1] as CommentId[])[0];
    expect(lastDeletedId).toEqual(expectedId);
  }
}
