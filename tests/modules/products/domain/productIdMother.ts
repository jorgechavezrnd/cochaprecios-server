import { ProductId } from '../../../../src/modules/products/domain/productId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class ProductIdMother {
  static create(value: string): ProductId { return new ProductId(value); }
  static random(): ProductId { return this.create(UuidMother.random()); }
}

