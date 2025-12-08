import { Nullable } from '../../shared/domain/nullable';
import { Favorite } from './favorite';
import { FavoriteId } from './favoriteId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';

export interface FavoriteRepository {
  save(favorite: Favorite): Promise<void>;
  delete(id: FavoriteId): Promise<void>;
  findById(id: FavoriteId): Promise<Nullable<Favorite>>;
  findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Favorite>>;
  findByUser(userId: UserId): Promise<Favorite[]>;
}
