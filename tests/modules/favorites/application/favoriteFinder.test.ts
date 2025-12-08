import FavoriteFinder from '../../../../src/modules/favorites/application/favoriteFinder';
import { FavoriteRepositoryMock } from '../__mocks__/favoriteRepositoryMock';
import { FavoriteMother } from '../domain/favoriteMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('FavoriteFinder', () => {
  let repository: FavoriteRepositoryMock;
  let finder: FavoriteFinder;

  beforeEach(() => {
    repository = new FavoriteRepositoryMock();
    finder = new FavoriteFinder(repository);
  });

  it('should find favorites for a user', async () => {
    const userId = UuidMother.random();
    const favorites = [FavoriteMother.random(), FavoriteMother.random()];

    repository.whenFindByUserReturn(favorites);

    const result = await finder.run({ userId });

    expect(result.favorites).toHaveLength(2);
    expect(result.favorites[0]).toEqual(favorites[0].toPrimitives());
    expect(result.favorites[1]).toEqual(favorites[1].toPrimitives());
  });

  it('should return empty array when no favorites exist', async () => {
    const userId = UuidMother.random();

    repository.whenFindByUserReturn([]);

    const result = await finder.run({ userId });

    expect(result.favorites).toHaveLength(0);
  });
});
