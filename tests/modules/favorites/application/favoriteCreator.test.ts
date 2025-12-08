import FavoriteCreator from '../../../../src/modules/favorites/application/favoriteCreator';
import { FavoriteRepositoryMock } from '../__mocks__/favoriteRepositoryMock';
import { FavoriteMother } from '../domain/favoriteMother';
import { FavoriteIdMother } from '../domain/favoriteIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('FavoriteCreator', () => {
  let repository: FavoriteRepositoryMock;
  let creator: FavoriteCreator;

  beforeEach(() => {
    repository = new FavoriteRepositoryMock();
    creator = new FavoriteCreator(repository);
  });

  it('should create a valid favorite', async () => {
    const id = FavoriteIdMother.random();
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const userId = UuidMother.random();

    repository.whenFindByUserAndProductStoreReturn(null);

    await creator.run({ id: id.value, productId, storeId, userId });

    const expected = FavoriteMother.create(
      id,
      { value: productId } as any,
      { value: storeId } as any,
      { value: userId } as any
    );
    repository.assertLastSavedFavoriteIs(expected);
  });

  it('should not create duplicate favorite', async () => {
    const favorite = FavoriteMother.random();
    repository.whenFindByUserAndProductStoreReturn(favorite);

    await creator.run({
      id: UuidMother.random(),
      productId: favorite.productId.value,
      storeId: favorite.storeId.value,
      userId: favorite.userId.value
    });

    expect(repository['mockSave']).not.toHaveBeenCalled();
  });
});
