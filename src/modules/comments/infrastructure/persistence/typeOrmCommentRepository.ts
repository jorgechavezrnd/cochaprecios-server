import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Comment } from '../../domain/comment';
import { CommentRepository } from '../../domain/commentRepository';
import { CommentId } from '../../domain/commentId';
import { ProductId } from '../../../products/domain/productId';
import { StoreId } from '../../../stores/domain/storeId';
import { CommentEntity } from './typeorm/commentEntity';

export default class TypeOrmCommentRepository extends TypeOrmRepository<Comment> implements CommentRepository {
  public async save(comment: Comment): Promise<void> {
    await this.persist(comment);
  }

  public async delete(id: CommentId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id } as any);
  }

  public async findById(id: CommentId): Promise<Nullable<Comment>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } } as any) as any;
  }

  public async findByProductAndStore(productId: ProductId, storeId: StoreId): Promise<Comment[]> {
    const repository = await this.repository();
    return repository.find({ where: { productId, storeId } } as any) as any;
  }

  protected entitySchema(): EntitySchema<Comment> {
    return CommentEntity;
  }
}
