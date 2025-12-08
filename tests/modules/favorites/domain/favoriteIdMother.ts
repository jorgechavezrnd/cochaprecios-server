import { FavoriteId } from '../../../../src/modules/favorites/domain/favoriteId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class FavoriteIdMother {
  static create(value: string): FavoriteId {
    return new FavoriteId(value);
  }

  static random(): FavoriteId {
    return this.create(UuidMother.random());
  }
}
