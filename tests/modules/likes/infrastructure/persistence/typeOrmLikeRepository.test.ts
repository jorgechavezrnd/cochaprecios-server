import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { LikeRepository } from '../../../../../src/modules/likes/domain/likeRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { LikeMother } from '../../domain/likeMother';
import { LikeIdMother } from '../../domain/likeIdMother';
import { UuidMother } from '../../../shared/domain/uuidMother';
import { ProductId } from '../../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../../src/modules/stores/domain/storeId';
import { UserId } from '../../../../../src/modules/users/domain/userId';

describe('TypeOrmLikeRepository', () => {
  let repository: LikeRepository;
  let environmentArranger: Promise<EnvironmentArranger>;

  beforeAll(async () => {
    await initializeContainer();
    const container = getContainer();
    repository = container.get('Likes.domain.LikeRepository');
    environmentArranger = container.get('Shared.EnvironmentArranger');
  });

  beforeEach(async () => {
    await (await environmentArranger).arrangeTable('product_likes');
  });

  afterAll(async () => {
    await (await environmentArranger).arrangeTable('product_likes');
    await (await environmentArranger).close();
  });

  describe('#save', () => {
    it('should save a like', async () => {
      const like = LikeMother.random();
      await repository.save(like);
      const saved = await repository.findById(like.id);
      expect(saved).toBeDefined();
      expect(saved?.id.value).toBe(like.id.value);
    });
  });

  describe('#findById', () => {
    it('should find a like by id', async () => {
      const like = LikeMother.random();
      await repository.save(like);
      const found = await repository.findById(like.id);
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(like.id.value);
    });

    it('should return null if not found', async () => {
      const id = LikeIdMother.random();
      const found = await repository.findById(id);
      expect(found).toBeNull();
    });
  });

  describe('#findByUserAndProductStore', () => {
    it('should find a like by user, product and store', async () => {
      const like = LikeMother.random();
      await repository.save(like);
      const found = await repository.findByUserAndProductStore(like.userId, like.productId, like.storeId);
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(like.id.value);
    });

    it('should return null if not found', async () => {
      const userId = new UserId(UuidMother.random());
      const productId = new ProductId(UuidMother.random());
      const storeId = new StoreId(UuidMother.random());
      const found = await repository.findByUserAndProductStore(userId, productId, storeId);
      expect(found).toBeNull();
    });
  });

  describe('#countByProductStore', () => {
    it('should count likes for a product and store', async () => {
      const productId = new ProductId(UuidMother.random());
      const storeId = new StoreId(UuidMother.random());

      const like1 = LikeMother.create(
        LikeIdMother.random(),
        productId,
        storeId,
        new UserId(UuidMother.random())
      );
      const like2 = LikeMother.create(
        LikeIdMother.random(),
        productId,
        storeId,
        new UserId(UuidMother.random())
      );

      await repository.save(like1);
      await repository.save(like2);

      const count = await repository.countByProductStore(productId, storeId);
      expect(count).toBe(2);
    });
  });

  describe('#delete', () => {
    it('should delete a like by id', async () => {
      const like = LikeMother.random();
      await repository.save(like);
      await repository.delete(like.id);
      const found = await repository.findById(like.id);
      expect(found).toBeNull();
    });
  });
});
