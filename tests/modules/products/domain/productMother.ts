import { Product } from '../../../../src/modules/products/domain/product';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { ProductName } from '../../../../src/modules/products/domain/productName';
import { ProductDescription } from '../../../../src/modules/products/domain/productDescription';
import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { ProductIdMother } from './productIdMother';
import { ProductNameMother } from './productNameMother';
import { ProductDescriptionMother } from './productDescriptionMother';
import { CategoryIdMother } from '../../shared/domain/categoryIdMother';

export class ProductMother {
  static create(id: ProductId, name: ProductName, description: ProductDescription, categoryId: CategoryId): Product {
    return new Product(id, name, description, categoryId);
  }

  static random(): Product {
    return this.create(ProductIdMother.random(), ProductNameMother.random(), ProductDescriptionMother.random(), CategoryIdMother.random());
  }
}
