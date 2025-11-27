import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';

export class ProductName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string): void {
    if (value.length < 3) throw new Error('Product name too short');
    if (value.length > 60) throw new Error('Product name length exceeded');
  }
}
