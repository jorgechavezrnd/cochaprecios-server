import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class PriceCurrency extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (!/^[A-Z]{3}$/.test(value)) throw new InvalidArgumentError(`Currency must be 3-letter ISO code`);
  }
}

