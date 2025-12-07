import { ValueObject } from './valueObject';

export class DateValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    super(value);
  }
}
