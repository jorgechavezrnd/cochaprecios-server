import { CategoryDescription } from '../../../../src/modules/categories/domain/categoryDescription';
import { WordMother } from '../../shared/domain/wordMother';

export class CategoryDescriptionMother {
  static create(value: string): CategoryDescription {
    return new CategoryDescription(value);
  }

  static random(): CategoryDescription {
    return this.create(WordMother.randomWithLength({ min: 3, max: 255 }));
  }

  static invalidTooShort(): string {
    return '';
  }

  static invalidTooLong(): string {
    return 'a'.repeat(256);
  }
}
