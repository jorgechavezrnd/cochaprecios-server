import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';

export class ProductDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string): void {
    if (value.length < 3) throw new Error('Product description too short');
    if (value.length > 255) throw new Error('Product description too long');
  }
}

