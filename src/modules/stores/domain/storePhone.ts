import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class StorePhone extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value.length < 3) throw new InvalidArgumentError(`The Store Phone must be at least 3 characters`);
    if (value.length > 30) throw new InvalidArgumentError(`The Store Phone has more than 30 characters`);
  }
}

