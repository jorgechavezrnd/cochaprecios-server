import { NewableClass } from '../../../domain/newableClass';
import { ValueObject } from '../../../domain/value-object/valueObject';

export const ValueObjectTransformer = (ValueObjectClass: NewableClass<ValueObject<any>>) => ({
  to: (value: ValueObject<any>): any => value.value,
  from: (value: any): ValueObject<any> => new ValueObjectClass(value),
});
