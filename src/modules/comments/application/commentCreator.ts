import { CommentRepository } from '../domain/commentRepository';
import { Comment } from '../domain/comment';
import { CommentId } from '../domain/commentId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';
import { CommentContent } from '../domain/commentContent';
import { CreateCommentRequest } from './createCommentRequest';

export default class CommentCreator {
  constructor(private readonly repository: CommentRepository) { }

  async run(request: CreateCommentRequest): Promise<void> {
    const comment = new Comment(
      new CommentId(request.id),
      new ProductId(request.productId),
      new StoreId(request.storeId),
      new UserId(request.userId),
      new CommentContent(request.content)
    );
    await this.repository.save(comment);
  }
}
