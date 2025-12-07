import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { CommentId } from './commentId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';
import { CommentContent } from './commentContent';
import { CommentCreatedAt } from './commentCreatedAt';

export class Comment extends AggregateRoot {
  readonly id: CommentId;
  readonly productId: ProductId;
  readonly storeId: StoreId;
  readonly userId: UserId;
  readonly content: CommentContent;
  readonly createdAt?: CommentCreatedAt;

  constructor(
    id: CommentId,
    productId: ProductId,
    storeId: StoreId,
    userId: UserId,
    content: CommentContent,
    createdAt?: CommentCreatedAt
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.storeId = storeId;
    this.userId = userId;
    this.content = content;
    this.createdAt = createdAt;
  }

  static fromPrimitives(plain: {
    id: string;
    productId: string;
    storeId: string;
    userId: string;
    content: string;
    createdAt?: Date;
  }): Comment {
    return new Comment(
      new CommentId(plain.id),
      new ProductId(plain.productId),
      new StoreId(plain.storeId),
      new UserId(plain.userId),
      new CommentContent(plain.content),
      plain.createdAt ? new CommentCreatedAt(plain.createdAt) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      productId: this.productId.value,
      storeId: this.storeId.value,
      userId: this.userId.value,
      content: this.content.value,
      createdAt: this.createdAt?.value,
    };
  }
}
