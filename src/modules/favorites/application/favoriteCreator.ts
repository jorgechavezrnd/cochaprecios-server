import { FavoriteRepository } from '../domain/favoriteRepository';
import { Favorite } from '../domain/favorite';
import { FavoriteId } from '../domain/favoriteId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';
import { CreateFavoriteRequest } from './createFavoriteRequest';

export default class FavoriteCreator {
  constructor(private readonly repository: FavoriteRepository) { }

  async run(request: CreateFavoriteRequest): Promise<void> {
    const existing = await this.repository.findByUserAndProductStore(
      new UserId(request.userId),
      new ProductId(request.productId),
      new StoreId(request.storeId)
    );
    if (existing) return;

    const favorite = new Favorite(
      new FavoriteId(request.id),
      new ProductId(request.productId),
      new StoreId(request.storeId),
      new UserId(request.userId)
    );
    await this.repository.save(favorite);
  }
}
