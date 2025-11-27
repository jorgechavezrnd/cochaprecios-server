import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';

export class ProductImageUrl extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value.length > 255) throw new Error('Product image url too long');
  }
}

