import { CommentId } from '../../../../src/modules/comments/domain/commentId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class CommentIdMother {
  static create(value: string): CommentId {
    return new CommentId(value);
  }

  static random(): CommentId {
    return this.create(UuidMother.random());
  }
}
