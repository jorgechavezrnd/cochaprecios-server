import { ProductName } from '../../../../src/modules/products/domain/productName';
import { WordMother } from '../../shared/domain/wordMother';

export class ProductNameMother {
  static create(value: string): ProductName { return new ProductName(value); }
  static random(): ProductName { return this.create(WordMother.randomWithLength({ min: 3, max: 30 })); }
  static invalidName(): string { return 'a'.repeat(2); }
}

