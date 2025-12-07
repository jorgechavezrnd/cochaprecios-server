import { Like } from '../../../../src/modules/likes/domain/like';
import { LikeId } from '../../../../src/modules/likes/domain/likeId';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../src/modules/users/domain/userId';
import { LikeCreatedAt } from '../../../../src/modules/likes/domain/likeCreatedAt';
import { UuidMother } from '../../shared/domain/uuidMother';

export class LikeMother {
  static create(
    id: LikeId,
    productId: ProductId,
    storeId: StoreId,
    userId: UserId,
    createdAt?: LikeCreatedAt
  ): Like {
    return new Like(id, productId, storeId, userId, createdAt);
  }

  static random(): Like {
    return this.create(
      new LikeId(UuidMother.random()),
      new ProductId(UuidMother.random()),
      new StoreId(UuidMother.random()),
      new UserId(UuidMother.random()),
      new LikeCreatedAt(new Date())
    );
  }
}
