import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { Favorite } from '../../../domain/favorite';
import { FavoriteId } from '../../../domain/favoriteId';
import { ProductId } from '../../../../products/domain/productId';
import { StoreId } from '../../../../stores/domain/storeId';
import { UserId } from '../../../../users/domain/userId';
import { FavoriteCreatedAt } from '../../../domain/favoriteCreatedAt';

export const FavoriteEntity = new EntitySchema<Favorite>({
  name: 'Favorite',
  tableName: 'user_favorites',
  target: Favorite,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(FavoriteId) },
    productId: { type: String, name: 'product_id', transformer: ValueObjectTransformer(ProductId) },
    storeId: { type: String, name: 'store_id', transformer: ValueObjectTransformer(StoreId) },
    userId: { type: String, name: 'user_id', transformer: ValueObjectTransformer(UserId) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at', transformer: ValueObjectTransformer(FavoriteCreatedAt) },
  },
  uniques: [
    { name: 'idx_user_favorites_unique', columns: ['userId', 'productId', 'storeId'] }
  ],
});
