import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Store } from '../../domain/store';
import { StoreId } from '../../domain/storeId';
import { StoreName } from '../../domain/storeName';
import { StoreRepository } from '../../domain/storeRepository';
import { StoreEntity } from './typeorm/storeEntity';

export default class TypeOrmStoreRepository extends TypeOrmRepository<Store> implements StoreRepository {
  public async save(store: Store): Promise<void> {
    return this.persist(store);
  }

  public async findById(id: StoreId): Promise<Nullable<Store>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } });
  }

  public async findByName(name: StoreName): Promise<Nullable<Store>> {
    const repository = await this.repository();
    return repository.findOne({ where: { name } });
  }

  public async findAll(): Promise<Store[]> {
    const repository = await this.repository();
    return repository.find();
  }

  public async delete(id: StoreId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id });
  }

  protected entitySchema(): EntitySchema<Store> {
    return StoreEntity;
  }
}
