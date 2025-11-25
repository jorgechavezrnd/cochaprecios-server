import { StringValueObject } from '../../shared/domain/value-object/stringValueObject';
import { CategoryDescriptionTooLong } from './categoryDescriptionTooLong';
import { CategoryDescriptionTooShort } from './categoryDescriptionTooShort';

export class CategoryDescription extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureLengthIsValid(value);
  }

  private ensureLengthIsValid(value: string): void {
    if (value.length > 255) {
      throw new CategoryDescriptionTooLong(`The Category Description <${value}> has more than 255 characters`);
    }
    if (value.length < 3) {
      throw new CategoryDescriptionTooShort(`The Category Description <${value}> must be at least 3 characters`);
    }
  }
}
