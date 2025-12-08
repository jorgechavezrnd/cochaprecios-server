import { FavoriteRepository } from '../domain/favoriteRepository';
import { UserId } from '../../users/domain/userId';

export default class FavoriteFinder {
  constructor(private readonly repository: FavoriteRepository) { }

  async run(request: { userId: string }): Promise<{ favorites: any[] }> {
    const favorites = await this.repository.findByUser(
      new UserId(request.userId)
    );

    return {
      favorites: favorites.map(favorite => favorite.toPrimitives())
    };
  }
}
