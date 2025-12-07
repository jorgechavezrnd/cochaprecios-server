import { Nullable } from '../../shared/domain/nullable';
import { Comment } from './comment';
import { CommentId } from './commentId';

export interface CommentRepository {
  save(comment: Comment): Promise<void>;
  search(id: CommentId): Promise<Nullable<Comment>>;
}
