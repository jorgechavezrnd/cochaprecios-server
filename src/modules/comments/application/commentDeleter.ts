import { CommentRepository } from '../domain/commentRepository';
import { CommentId } from '../domain/commentId';
import { UserId } from '../../users/domain/userId';

export default class CommentDeleter {
  constructor(private readonly repository: CommentRepository) { }

  async run(request: { id: string; userId: string }): Promise<void> {
    const commentId = new CommentId(request.id);
    const comment = await this.repository.findById(commentId);

    if (!comment) {
      throw new Error(`Comment with id ${request.id} does not exist`);
    }

    if (comment.userId.value !== request.userId) {
      throw new Error('Forbidden: cannot delete others comment');
    }

    await this.repository.delete(commentId);
  }
}
