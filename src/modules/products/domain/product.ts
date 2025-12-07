import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { ProductId } from './productId';
import { ProductName } from './productName';
import { ProductDescription } from './productDescription';
import { CategoryId } from '../../shared/domain/categories/categoryId';
import { ProductImageUrl } from './productImageUrl';
import { ProductCreatedAt } from './productCreatedAt';
import { ProductUpdatedAt } from './productUpdatedAt';

export class Product extends AggregateRoot {
  readonly id: ProductId;
  name: ProductName;
  description: ProductDescription;
  categoryId: CategoryId;
  imageUrl?: ProductImageUrl;
  readonly createdAt?: ProductCreatedAt;
  updatedAt?: ProductUpdatedAt;

  constructor(
    id: ProductId,
    name: ProductName,
    description: ProductDescription,
    categoryId: CategoryId,
    imageUrl?: ProductImageUrl,
    createdAt?: ProductCreatedAt,
    updatedAt?: ProductUpdatedAt
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plain: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    imageUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Product {
    return new Product(
      new ProductId(plain.id),
      new ProductName(plain.name),
      new ProductDescription(plain.description),
      new CategoryId(plain.categoryId),
      plain.imageUrl ? new ProductImageUrl(plain.imageUrl) : undefined,
      plain.createdAt ? new ProductCreatedAt(plain.createdAt) : undefined,
      plain.updatedAt ? new ProductUpdatedAt(plain.updatedAt) : undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      categoryId: this.categoryId.value,
      imageUrl: this.imageUrl?.value,
      createdAt: this.createdAt?.value,
      updatedAt: this.updatedAt?.value,
    };
  }
}
