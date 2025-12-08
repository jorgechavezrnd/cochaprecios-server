import { getContainer, initializeContainer } from '../../../../../src/api/shared/dependency-injection/container';
import { CommentRepository } from '../../../../../src/modules/comments/domain/commentRepository';
import { EnvironmentArranger } from '../../../shared/infrastructure/arranger/environmentArranger';
import { CommentMother } from '../../domain/commentMother';
import { CommentIdMother } from '../../domain/commentIdMother';
import { UuidMother } from '../../../shared/domain/uuidMother';
import { ProductId } from '../../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../../src/modules/stores/domain/storeId';

describe('TypeOrmCommentRepository', () => {
  let repository: CommentRepository;
  let environmentArranger: Promise<EnvironmentArranger>;

  beforeAll(async () => {
    await initializeContainer();
    const container = getContainer();
    repository = container.get('Comments.domain.CommentRepository');
    environmentArranger = container.get('Shared.EnvironmentArranger');
  });

  beforeEach(async () => {
    await (await environmentArranger).arrangeTable('product_comments');
  });

  afterAll(async () => {
    await (await environmentArranger).arrangeTable('product_comments');
    await (await environmentArranger).close();
  });

  describe('#save', () => {
    it('should save a comment', async () => {
      const comment = CommentMother.random();
      await repository.save(comment);
      const saved = await repository.findById(comment.id);
      expect(saved).toBeDefined();
      expect(saved?.id.value).toBe(comment.id.value);
    });
  });

  describe('#findById', () => {
    it('should find a comment by id', async () => {
      const comment = CommentMother.random();
      await repository.save(comment);
      const found = await repository.findById(comment.id);
      expect(found).toBeDefined();
      expect(found?.id.value).toBe(comment.id.value);
    });

    it('should return null if not found', async () => {
      const id = CommentIdMother.random();
      const found = await repository.findById(id);
      expect(found).toBeNull();
    });
  });

  describe('#findByProductAndStore', () => {
    it('should find comments by product and store', async () => {
      const productId = new ProductId(UuidMother.random());
      const storeId = new StoreId(UuidMother.random());

      const comment1 = CommentMother.create(
        CommentIdMother.random(),
        productId,
        storeId,
        { value: UuidMother.random() } as any
      );
      const comment2 = CommentMother.create(
        CommentIdMother.random(),
        productId,
        storeId,
        { value: UuidMother.random() } as any
      );

      await repository.save(comment1);
      await repository.save(comment2);

      const comments = await repository.findByProductAndStore(productId, storeId);
      expect(comments).toHaveLength(2);
    });
  });

  describe('#delete', () => {
    it('should delete a comment by id', async () => {
      const comment = CommentMother.random();
      await repository.save(comment);
      await repository.delete(comment.id);
      const found = await repository.findById(comment.id);
      expect(found).toBeNull();
    });
  });
});
