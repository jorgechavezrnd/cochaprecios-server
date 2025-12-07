import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { LikeId } from './likeId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';
import { LikeCreatedAt } from './likeCreatedAt';

export class Like extends AggregateRoot {
  readonly id: LikeId;
  readonly productId: ProductId;
  readonly storeId: StoreId;
  readonly userId: UserId;
  readonly createdAt?: LikeCreatedAt;

  constructor(id: LikeId, productId: ProductId, storeId: StoreId, userId: UserId, createdAt?: LikeCreatedAt) {
    super();
    this.id = id;
    this.productId = productId;
    this.storeId = storeId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static fromPrimitives(plain: { id: string; productId: string; storeId: string; userId: string; createdAt?: Date }): Like {
    return new Like(
      new LikeId(plain.id),
      new ProductId(plain.productId),
      new StoreId(plain.storeId),
      new UserId(plain.userId),
      plain.createdAt ? new LikeCreatedAt(plain.createdAt) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      productId: this.productId.value,
      storeId: this.storeId.value,
      userId: this.userId.value,
      createdAt: this.createdAt?.value,
    };
  }
}

