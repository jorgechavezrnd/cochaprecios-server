import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Favorite } from '../../domain/favorite';
import { FavoriteRepository } from '../../domain/favoriteRepository';
import { FavoriteId } from '../../domain/favoriteId';
import { ProductId } from '../../../products/domain/productId';
import { StoreId } from '../../../stores/domain/storeId';
import { UserId } from '../../../users/domain/userId';
import { FavoriteEntity } from './typeorm/favoriteEntity';

export default class TypeOrmFavoriteRepository extends TypeOrmRepository<Favorite> implements FavoriteRepository {
  public async save(favorite: Favorite): Promise<void> {
    await this.persist(favorite);
  }

  public async delete(id: FavoriteId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id } as any);
  }

  public async findById(id: FavoriteId): Promise<Nullable<Favorite>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } } as any) as any;
  }

  public async findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Favorite>> {
    const repository = await this.repository();
    return repository.findOne({ where: { userId, productId, storeId } } as any) as any;
  }

  public async findByUser(userId: UserId): Promise<Favorite[]> {
    const repository = await this.repository();
    return repository.find({ where: { userId } } as any) as any;
  }

  protected entitySchema(): EntitySchema<Favorite> {
    return FavoriteEntity;
  }
}
