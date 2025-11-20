import { EntitySchema } from 'typeorm';
import { User } from '../../../domain/user';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { UserId } from '../../../domain/userId';
import { UserName } from '../../../domain/userName';

export const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(UserId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserName),
    }
  }
});
