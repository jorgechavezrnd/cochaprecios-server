import { FavoriteRepository } from '../domain/favoriteRepository';
import { FavoriteId } from '../domain/favoriteId';
import { UserId } from '../../users/domain/userId';

export default class FavoriteDeleter {
  constructor(private readonly repository: FavoriteRepository) { }

  async run(request: { id: string; userId: string }): Promise<void> {
    const favoriteId = new FavoriteId(request.id);
    const favorite = await this.repository.findById(favoriteId);

    if (!favorite) {
      throw new Error(`Favorite with id ${request.id} does not exist`);
    }

    if (favorite.userId.value !== request.userId) {
      throw new Error('Forbidden: cannot delete others favorite');
    }

    await this.repository.delete(favoriteId);
  }
}
