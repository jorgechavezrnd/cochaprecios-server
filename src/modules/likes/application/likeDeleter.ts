import { LikeRepository } from '../domain/likeRepository';
import { LikeId } from '../domain/likeId';
import { UserId } from '../../users/domain/userId';

export default class LikeDeleter {
  constructor(private readonly repository: LikeRepository) {}

  async run(request: { id: string; userId: string }): Promise<void> {
    const like = await this.repository.findById(new LikeId(request.id));
    if (!like) throw Object.assign(new Error(`Like with id ${request.id} does not exist`), { status: 404 });
    if (like.userId.value !== request.userId) {
      throw Object.assign(new Error('Forbidden: cannot delete others like'), { status: 403 });
    }
    await this.repository.delete(new LikeId(request.id));
  }
}

