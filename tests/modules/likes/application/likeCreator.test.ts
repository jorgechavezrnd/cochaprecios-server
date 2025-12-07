import LikeCreator from '../../../../src/modules/likes/application/likeCreator';
import { LikeRepositoryMock } from '../__mocks__/likeRepositoryMock';
import { LikeMother } from '../domain/likeMother';
import { LikeIdMother } from '../domain/likeIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('LikeCreator', () => {
  let repository: LikeRepositoryMock;
  let creator: LikeCreator;

  beforeEach(() => {
    repository = new LikeRepositoryMock();
    creator = new LikeCreator(repository);
  });

  it('should create a valid like', async () => {
    const id = LikeIdMother.random();
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const userId = UuidMother.random();

    repository.whenFindByUserAndProductStoreReturn(null);

    await creator.run({ id: id.value, productId, storeId, userId });

    const expected = LikeMother.create(
      id,
      { value: productId } as any,
      { value: storeId } as any,
      { value: userId } as any
    );
    repository.assertLastSavedLikeIs(expected);
  });

  it('should not create duplicate like', async () => {
    const existing = LikeMother.random();
    repository.whenFindByUserAndProductStoreReturn(existing);

    await creator.run({
      id: UuidMother.random(),
      productId: existing.productId.value,
      storeId: existing.storeId.value,
      userId: existing.userId.value,
    });

    // Should not save if already exists
    expect(repository['mockSave']).not.toHaveBeenCalled();
  });
});
