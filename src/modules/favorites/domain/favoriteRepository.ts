import { Nullable } from '../../shared/domain/nullable';
import { Favorite } from './favorite';
import { FavoriteId } from './favoriteId';

export interface FavoriteRepository {
  save(favorite: Favorite): Promise<void>;
  search(id: FavoriteId): Promise<Nullable<Favorite>>;
}
