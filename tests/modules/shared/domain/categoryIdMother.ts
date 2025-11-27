import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { UuidMother } from '../domain/uuidMother';

export class CategoryIdMother {
  static create(value: string): CategoryId { return new CategoryId(value); }
  static random(): CategoryId { return this.create(UuidMother.random()); }
}

