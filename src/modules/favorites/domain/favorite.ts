import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { FavoriteId } from './favoriteId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { UserId } from '../../users/domain/userId';
import { FavoriteCreatedAt } from './favoriteCreatedAt';

export class Favorite extends AggregateRoot {
  readonly id: FavoriteId;
  readonly productId: ProductId;
  readonly storeId: StoreId;
  readonly userId: UserId;
  readonly createdAt?: FavoriteCreatedAt;

  constructor(
    id: FavoriteId,
    productId: ProductId,
    storeId: StoreId,
    userId: UserId,
    createdAt?: FavoriteCreatedAt
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.storeId = storeId;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  static fromPrimitives(plain: {
    id: string;
    productId: string;
    storeId: string;
    userId: string;
    createdAt?: Date;
  }): Favorite {
    return new Favorite(
      new FavoriteId(plain.id),
      new ProductId(plain.productId),
      new StoreId(plain.storeId),
      new UserId(plain.userId),
      plain.createdAt ? new FavoriteCreatedAt(plain.createdAt) : undefined
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
