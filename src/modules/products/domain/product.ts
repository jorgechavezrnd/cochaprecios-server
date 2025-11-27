import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { ProductId } from './productId';
import { ProductName } from './productName';
import { ProductDescription } from './productDescription';
import { ProductCategoryId } from './productCategoryId';
import { ProductImageUrl } from './productImageUrl';

export class Product extends AggregateRoot {
  readonly id: ProductId;
  name: ProductName;
  description: ProductDescription;
  categoryId: ProductCategoryId;
  imageUrl?: ProductImageUrl;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: ProductId,
    name: ProductName,
    description: ProductDescription,
    categoryId: ProductCategoryId,
    imageUrl?: ProductImageUrl,
    createdAt?: Date,
    updatedAt?: Date
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
      new ProductCategoryId(plain.categoryId),
      plain.imageUrl ? new ProductImageUrl(plain.imageUrl) : undefined,
      plain.createdAt,
      plain.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      categoryId: this.categoryId.value,
      imageUrl: this.imageUrl?.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

