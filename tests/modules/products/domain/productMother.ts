import { Product } from '../../../../src/modules/products/domain/product';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { ProductName } from '../../../../src/modules/products/domain/productName';
import { ProductDescription } from '../../../../src/modules/products/domain/productDescription';
import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { ProductCreatedAt } from '../../../../src/modules/products/domain/productCreatedAt';
import { ProductUpdatedAt } from '../../../../src/modules/products/domain/productUpdatedAt';
import { ProductImageUrl } from '../../../../src/modules/products/domain/productImageUrl';
import { CreateProductRequest } from '../../../../src/modules/products/application/createProductRequest';
import { ProductIdMother } from './productIdMother';
import { ProductNameMother } from './productNameMother';
import { ProductDescriptionMother } from './productDescriptionMother';
import { CategoryIdMother } from '../../shared/domain/categoryIdMother';

export class ProductMother {
  static create(
    id: ProductId,
    name: ProductName,
    description: ProductDescription,
    categoryId: CategoryId,
    imageUrl?: ProductImageUrl,
    createdAt?: ProductCreatedAt,
    updatedAt?: ProductUpdatedAt
  ): Product {
    return new Product(id, name, description, categoryId, imageUrl, createdAt, updatedAt);
  }

  static fromRequest(request: CreateProductRequest): Product {
    return this.create(
      ProductIdMother.create(request.id),
      ProductNameMother.create(request.name),
      ProductDescriptionMother.create(request.description),
      CategoryIdMother.create(request.categoryId),
      request.imageUrl ? new ProductImageUrl(request.imageUrl) : undefined
    );
  }

  static random(): Product {
    return this.create(
      ProductIdMother.random(),
      ProductNameMother.random(),
      ProductDescriptionMother.random(),
      CategoryIdMother.random(),
      undefined,
      new ProductCreatedAt(new Date()),
      new ProductUpdatedAt(new Date())
    );
  }
}
