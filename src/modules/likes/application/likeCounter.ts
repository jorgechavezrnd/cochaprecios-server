import { LikeRepository } from '../domain/likeRepository';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export default class LikeCounter {
  constructor(private readonly repository: LikeRepository) {}

  async run(params: { productId: string; storeId: string }): Promise<{ count: number }> {
    const count = await this.repository.countByProductStore(new ProductId(params.productId), new StoreId(params.storeId));
    return { count };
  }
}

