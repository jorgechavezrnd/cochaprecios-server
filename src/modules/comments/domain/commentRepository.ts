import { Nullable } from '../../shared/domain/nullable';
import { Comment } from './comment';
import { CommentId } from './commentId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export interface CommentRepository {
  save(comment: Comment): Promise<void>;
  delete(id: CommentId): Promise<void>;
  findById(id: CommentId): Promise<Nullable<Comment>>;
  findByProductAndStore(productId: ProductId, storeId: StoreId): Promise<Comment[]>;
}
