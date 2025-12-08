import { Favorite } from '../../../../src/modules/favorites/domain/favorite';
import { FavoriteId } from '../../../../src/modules/favorites/domain/favoriteId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { FavoriteIdMother } from './favoriteIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

export class FavoriteMother {
  static create(
    id: FavoriteId,
    productId: ProductId,
    storeId: StoreId,
    userId: UserId
  ): Favorite {
    return new Favorite(id, productId, storeId, userId);
  }

  static random(): Favorite {
    return this.create(
      FavoriteIdMother.random(),
      new ProductId(UuidMother.random()),
      new StoreId(UuidMother.random()),
      new UserId(UuidMother.random())
    );
  }
}
