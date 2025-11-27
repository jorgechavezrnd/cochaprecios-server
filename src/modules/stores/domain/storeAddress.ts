import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class StoreAddress extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value.length < 3) throw new InvalidArgumentError(`The Store Address must be at least 3 characters`);
    if (value.length > 255) throw new InvalidArgumentError(`The Store Address has more than 255 characters`);
  }
}

