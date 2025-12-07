import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { Like } from '../../../domain/like';
import { LikeId } from '../../../domain/likeId';
import { ProductId } from '../../../../products/domain/productId';
import { StoreId } from '../../../../stores/domain/storeId';
import { UserId } from '../../../../users/domain/userId';
import { LikeCreatedAt } from '../../../domain/likeCreatedAt';

export const LikeEntity = new EntitySchema<Like>({
  name: 'Like',
  tableName: 'product_likes',
  target: Like,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(LikeId) },
    productId: { type: String, name: 'product_id', transformer: ValueObjectTransformer(ProductId) },
    storeId: { type: String, name: 'store_id', transformer: ValueObjectTransformer(StoreId) },
    userId: { type: String, name: 'user_id', transformer: ValueObjectTransformer(UserId) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at', transformer: ValueObjectTransformer(LikeCreatedAt) },
  },
  uniques: [
    { name: 'idx_product_likes_unique', columns: ['productId', 'storeId', 'userId'] }
  ],
});
