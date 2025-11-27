import { ProductDescription } from '../../../../src/modules/products/domain/productDescription';
import { WordMother } from '../../shared/domain/wordMother';

export class ProductDescriptionMother {
  static create(value: string): ProductDescription { return new ProductDescription(value); }
  static random(): ProductDescription { return this.create(WordMother.randomWithLength({ min: 3, max: 50 })); }
  static invalidTooShort(): string { return ''; }
}

