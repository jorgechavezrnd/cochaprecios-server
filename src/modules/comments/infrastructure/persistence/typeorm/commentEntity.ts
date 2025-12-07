import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { Comment } from '../../../domain/comment';
import { CommentId } from '../../../domain/commentId';
import { ProductId } from '../../../../products/domain/productId';
import { StoreId } from '../../../../stores/domain/storeId';
import { UserId } from '../../../../users/domain/userId';
import { CommentContent } from '../../../domain/commentContent';
import { CommentCreatedAt } from '../../../domain/commentCreatedAt';

export const CommentEntity = new EntitySchema<Comment>({
  name: 'Comment',
  tableName: 'product_comments',
  target: Comment,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(CommentId) },
    productId: { type: String, name: 'product_id', transformer: ValueObjectTransformer(ProductId) },
    storeId: { type: String, name: 'store_id', transformer: ValueObjectTransformer(StoreId) },
    userId: { type: String, name: 'user_id', transformer: ValueObjectTransformer(UserId) },
    content: { type: String, transformer: ValueObjectTransformer(CommentContent) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at', transformer: ValueObjectTransformer(CommentCreatedAt) },
  },
});
