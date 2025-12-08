import { Comment } from '../../../../src/modules/comments/domain/comment';
import { CommentId } from '../../../../src/modules/comments/domain/commentId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { CommentContent } from '../../../../src/modules/comments/domain/commentContent';
import { CommentIdMother } from './commentIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

export class CommentMother {
  static create(
    id: CommentId,
    productId: ProductId,
    storeId: StoreId,
    userId: UserId,
    content?: CommentContent
  ): Comment {
    return new Comment(
      id,
      productId,
      storeId,
      userId,
      content ?? new CommentContent('This is a test comment')
    );
  }

  static random(): Comment {
    return this.create(
      CommentIdMother.random(),
      new ProductId(UuidMother.random()),
      new StoreId(UuidMother.random()),
      new UserId(UuidMother.random()),
      new CommentContent('This is a random test comment')
    );
  }
}
