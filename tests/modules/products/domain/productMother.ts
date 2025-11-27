import { Product } from '../../../../src/modules/products/domain/product';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { ProductName } from '../../../../src/modules/products/domain/productName';
import { ProductDescription } from '../../../../src/modules/products/domain/productDescription';
import { ProductCategoryId } from '../../../../src/modules/products/domain/productCategoryId';
import { ProductIdMother } from './productIdMother';
import { ProductNameMother } from './productNameMother';
import { ProductDescriptionMother } from './productDescriptionMother';
import { ProductCategoryIdMother } from './productCategoryIdMother';

export class ProductMother {
  static create(id: ProductId, name: ProductName, description: ProductDescription, categoryId: ProductCategoryId): Product {
    return new Product(id, name, description, categoryId);
  }

  static random(): Product {
    return this.create(ProductIdMother.random(), ProductNameMother.random(), ProductDescriptionMother.random(), ProductCategoryIdMother.random());
  }
}

