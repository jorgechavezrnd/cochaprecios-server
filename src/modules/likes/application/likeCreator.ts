import { LikeRepository } from '../domain/likeRepository';
import { Like } from '../domain/like';
import { LikeId } from '../domain/likeId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';

export default class LikeCreator {
  constructor(private readonly repository: LikeRepository) {}

  async run(request: { id: string; productId: string; storeId: string; userId: string }): Promise<void> {
    const existing = await this.repository.findByUserAndProductStore(
      new UserId(request.userId),
      new ProductId(request.productId),
      new StoreId(request.storeId)
    );
    if (existing) return;

    const like = new Like(
      new LikeId(request.id),
      new ProductId(request.productId),
      new StoreId(request.storeId),
      new UserId(request.userId)
    );
    await this.repository.save(like);
  }
}

