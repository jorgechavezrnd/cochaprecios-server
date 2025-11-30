import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class PriceSource extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value.length < 2) throw new InvalidArgumentError(`Source must be at least 2 characters`);
    if (value.length > 60) throw new InvalidArgumentError(`Source has more than 60 characters`);
  }
}

