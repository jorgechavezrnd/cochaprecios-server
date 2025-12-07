import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { InvalidArgumentError } from '../../shared/domain/value-object/invalidArgumentError';

export class CommentContent extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsWithinRange(value);
  }

  private ensureLengthIsWithinRange(value: string): void {
    if (value.length < 3 || value.length > 500) {
      throw new InvalidArgumentError(`The comment content <${value}> is invalid, it must be between 3 and 500 characters`);
    }
  }
}
