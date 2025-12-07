import { Nullable } from '../../shared/domain/nullable';
import { Like } from './like';
import { LikeId } from './likeId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';

export interface LikeRepository {
  save(like: Like): Promise<void>;
  delete(id: LikeId): Promise<void>;
  findById(id: LikeId): Promise<Nullable<Like>>;
  findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Like>>;
  countByProductStore(productId: ProductId, storeId: StoreId): Promise<number>;
}

