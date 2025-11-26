import { CategoryName } from '../../../../src/modules/categories/domain/categoryName';
import { WordMother } from '../../shared/domain/wordMother';

export class CategoryNameMother {
  static create(value: string): CategoryName {
    return new CategoryName(value);
  }

  static random(): CategoryName {
    return this.create(WordMother.randomWithLength({ min: 3, max: 30 }));
  }

  static invalidName(): string {
    return 'a'.repeat(31);
  }
}
