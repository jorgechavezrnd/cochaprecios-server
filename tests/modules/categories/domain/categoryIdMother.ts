import { CategoryId } from '../../../../src/modules/categories/domain/categoryId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class CategoryIdMother {
  static create(value: string): CategoryId {
    return new CategoryId(value);
  }

  static random(): CategoryId {
    return this.create(UuidMother.random());
  }
}
