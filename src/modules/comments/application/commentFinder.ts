import { CommentRepository } from '../domain/commentRepository';
import { Comment } from '../domain/comment';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export default class CommentFinder {
  constructor(private readonly repository: CommentRepository) { }

  async run(request: { productId: string; storeId: string }): Promise<{ comments: any[] }> {
    const comments = await this.repository.findByProductAndStore(
      new ProductId(request.productId),
      new StoreId(request.storeId)
    );

    return {
      comments: comments.map(comment => comment.toPrimitives())
    };
  }
}
