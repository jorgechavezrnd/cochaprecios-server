import { ValueObject } from '../../shared/domain/value-object/valueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class PriceAmount extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    if (value < 0) throw new InvalidArgumentError(`Price must be non-negative`);
  }
}

