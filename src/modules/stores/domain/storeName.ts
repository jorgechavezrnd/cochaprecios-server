import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class StoreName extends StringValueObject {
  constructor(value: string) {
    super(value);
    if (value.length < 3) throw new InvalidArgumentError(`The Store Name <${value}> must be at least 3 characters`);
    if (value.length > 60) throw new InvalidArgumentError(`The Store Name <${value}> has more than 60 characters`);
  }
}

