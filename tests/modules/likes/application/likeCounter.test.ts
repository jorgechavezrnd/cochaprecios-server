import LikeCounter from '../../../../src/modules/likes/application/likeCounter';
import { LikeRepositoryMock } from '../__mocks__/likeRepositoryMock';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('LikeCounter', () => {
  let repository: LikeRepositoryMock;
  let counter: LikeCounter;

  beforeEach(() => {
    repository = new LikeRepositoryMock();
    counter = new LikeCounter(repository);
  });

  it('should count likes for a product and store', async () => {
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const expectedCount = 5;

    repository.whenCountByProductStoreReturn(expectedCount);

    const result = await counter.run({ productId, storeId });

    expect(result.count).toBe(expectedCount);
  });

  it('should return zero when no likes exist', async () => {
    const productId = UuidMother.random();
    const storeId = UuidMother.random();

    repository.whenCountByProductStoreReturn(0);

    const result = await counter.run({ productId, storeId });

    expect(result.count).toBe(0);
  });

  it('should return correct count for product with many likes', async () => {
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const expectedCount = 1000;

    repository.whenCountByProductStoreReturn(expectedCount);

    const result = await counter.run({ productId, storeId });

    expect(result.count).toBe(expectedCount);
  });
});
