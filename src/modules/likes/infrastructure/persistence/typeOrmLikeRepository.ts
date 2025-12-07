import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Like } from '../../domain/like';
import { LikeRepository } from '../../domain/likeRepository';
import { LikeId } from '../../domain/likeId';
import { ProductId } from '../../../products/domain/productId';
import { StoreId } from '../../../stores/domain/storeId';
import { UserId } from '../../../users/domain/userId';
import { LikeEntity } from './typeorm/likeEntity';

export default class TypeOrmLikeRepository extends TypeOrmRepository<Like> implements LikeRepository {
  public async save(like: Like): Promise<void> {
    await this.persist(like);
  }

  public async delete(id: LikeId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id } as any);
  }

  public async findById(id: LikeId): Promise<Nullable<Like>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } } as any) as any;
  }

  public async findByUserAndProductStore(userId: UserId, productId: ProductId, storeId: StoreId): Promise<Nullable<Like>> {
    const repository = await this.repository();
    return repository.findOne({ where: { userId, productId, storeId } } as any) as any;
  }

  public async countByProductStore(productId: ProductId, storeId: StoreId): Promise<number> {
    const repository = await this.repository();
    return repository.count({ where: { productId, storeId } } as any);
  }

  protected entitySchema(): EntitySchema<Like> {
    return LikeEntity;
  }
}

