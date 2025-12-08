import FavoriteDeleter from '../../../../src/modules/favorites/application/favoriteDeleter';
import { FavoriteRepositoryMock } from '../__mocks__/favoriteRepositoryMock';
import { FavoriteMother } from '../domain/favoriteMother';
import { FavoriteIdMother } from '../domain/favoriteIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('FavoriteDeleter', () => {
  let repository: FavoriteRepositoryMock;
  let deleter: FavoriteDeleter;

  beforeEach(() => {
    repository = new FavoriteRepositoryMock();
    deleter = new FavoriteDeleter(repository);
  });

  it('should delete an existing favorite', async () => {
    const favorite = FavoriteMother.random();
    repository.whenFindByIdReturn(favorite);

    await deleter.run({ id: favorite.id.value, userId: favorite.userId.value });

    repository.assertLastDeletedFavoriteIdIs(favorite.id);
  });

  it('should throw if favorite does not exist', async () => {
    const id = FavoriteIdMother.random();
    repository.whenFindByIdReturn(null);

    await expect(deleter.run({ id: id.value, userId: UuidMother.random() }))
      .rejects.toThrow(`Favorite with id ${id.value} does not exist`);
  });

  it('should throw if user is not the owner', async () => {
    const favorite = FavoriteMother.random();
    const differentUserId = UuidMother.random();
    repository.whenFindByIdReturn(favorite);

    await expect(deleter.run({ id: favorite.id.value, userId: differentUserId }))
      .rejects.toThrow('Forbidden: cannot delete others favorite');
  });
});
