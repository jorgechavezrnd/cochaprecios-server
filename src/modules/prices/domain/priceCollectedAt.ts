import { ValueObject } from '../../shared/domain/value-object/valueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class PriceCollectedAt extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
    if (!(value instanceof Date) || isNaN(value.getTime())) throw new InvalidArgumentError(`CollectedAt must be a valid date`);
  }
}

