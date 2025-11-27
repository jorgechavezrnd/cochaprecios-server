import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { CategoryId } from '../../shared/domain/categories/categoryId';
import { CategoryName } from './categoryName';
import { CategoryDescription } from './categoryDescription';

export class Category extends AggregateRoot {
  readonly id: CategoryId;
  name: CategoryName;
  description: CategoryDescription;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: CategoryId,
    name: CategoryName,
    description: CategoryDescription,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plainData: {
    id: string;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Category {
    return new Category(
      new CategoryId(plainData.id),
      new CategoryName(plainData.name),
      new CategoryDescription(plainData.description),
      plainData.createdAt,
      plainData.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
