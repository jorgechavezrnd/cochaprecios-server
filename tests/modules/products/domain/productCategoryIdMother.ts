import { ProductCategoryId } from '../../../../src/modules/products/domain/productCategoryId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class ProductCategoryIdMother {
  static create(value: string): ProductCategoryId { return new ProductCategoryId(value); }
  static random(): ProductCategoryId { return this.create(UuidMother.random()); }
}

