import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { User } from '../../domain/user';
import { UserId } from '../../domain/userId';
import { UserRepository } from '../../domain/userRepository';
import { UserEntity } from './typeorm/userEntity';

export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository {
  public async save(user: User): Promise<void> {
    return this.persist(user);
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const repository = await this.repository();

    const user = await repository.findOne({ where: { id: id.value } });

    return user;
  }

  protected entitySchema(): EntitySchema<User> {
    return UserEntity;
  }
}
