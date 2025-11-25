import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { CategoryNameLengthExceeded } from './categoryNameLengthExceeded';
import { CategoryNameTooShort } from './categoryNameTooShort';

export class CategoryName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string): void {
    if (value.length > 30) {
      throw new CategoryNameLengthExceeded(`The Category Name <${value}> has more than 30 characters`);
    }
    if (value.length < 3) {
      throw new CategoryNameTooShort(`The Category Name <${value}> must be at least 3 characters`);
    }
  }
}
