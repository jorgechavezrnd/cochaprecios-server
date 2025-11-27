import { Category } from '../../../../src/modules/categories/domain/category';
import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { CategoryName } from '../../../../src/modules/categories/domain/categoryName';
import { CategoryDescription } from '../../../../src/modules/categories/domain/categoryDescription';
import { CreateCategoryRequest } from '../../../../src/modules/categories/application/createCategoryRequest';
import { CategoryIdMother } from '../../shared/domain/categoryIdMother';
import { CategoryNameMother } from './categoryNameMother';
import { CategoryDescriptionMother } from './categoryDescriptionMother';

export class CategoryMother {
  static create(
    id: CategoryId,
    name: CategoryName,
    description: CategoryDescription
  ): Category {
    return new Category(id, name, description);
  }

  static fromRequest(request: CreateCategoryRequest): Category {
    return this.create(
      CategoryIdMother.create(request.id),
      CategoryNameMother.create(request.name),
      CategoryDescriptionMother.create(request.description)
    );
  }

  static random(): Category {
    return this.create(
      CategoryIdMother.random(),
      CategoryNameMother.random(),
      CategoryDescriptionMother.random()
    );
  }
}
