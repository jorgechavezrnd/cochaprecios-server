import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { UserId } from './userId';
import { UserName } from './userName';

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly name: UserName;

  constructor(id: UserId, name: UserName) {
    super();
    this.id = id;
    this.name = name;
  }

  static fromPrimitives(plainData: { id: string; name: string }) {
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
    );
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
    };
  }
}
