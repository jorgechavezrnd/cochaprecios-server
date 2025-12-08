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

  it('should create like for same user on different product', async () => {
    const userId = UuidMother.random();
    const productId1 = UuidMother.random();
    const productId2 = UuidMother.random();
    const storeId = UuidMother.random();

    repository.whenFindByUserAndProductStoreReturn(null);

    // First like
    await creator.run({ id: UuidMother.random(), productId: productId1, storeId, userId });

    // Second like on different product
    await creator.run({ id: UuidMother.random(), productId: productId2, storeId, userId });

    expect(repository['mockSave']).toHaveBeenCalledTimes(2);
  });

  it('should create like for different users on same product', async () => {
    const userId1 = UuidMother.random();
    const userId2 = UuidMother.random();
    const productId = UuidMother.random();
    const storeId = UuidMother.random();

    repository.whenFindByUserAndProductStoreReturn(null);

    // First user likes
    await creator.run({ id: UuidMother.random(), productId, storeId, userId: userId1 });

    // Second user likes same product
    await creator.run({ id: UuidMother.random(), productId, storeId, userId: userId2 });

    expect(repository['mockSave']).toHaveBeenCalledTimes(2);
  });
});
