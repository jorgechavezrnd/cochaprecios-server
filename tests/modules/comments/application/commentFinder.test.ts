import CommentFinder from '../../../../src/modules/comments/application/commentFinder';
import { CommentRepositoryMock } from '../__mocks__/commentRepositoryMock';
import { CommentMother } from '../domain/commentMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('CommentFinder', () => {
  let repository: CommentRepositoryMock;
  let finder: CommentFinder;

  beforeEach(() => {
    repository = new CommentRepositoryMock();
    finder = new CommentFinder(repository);
  });

  it('should find comments for a product and store', async () => {
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const comments = [CommentMother.random(), CommentMother.random()];

    repository.whenFindByProductAndStoreReturn(comments);

    const result = await finder.run({ productId, storeId });

    expect(result.comments).toHaveLength(2);
    expect(result.comments[0]).toEqual(comments[0].toPrimitives());
    expect(result.comments[1]).toEqual(comments[1].toPrimitives());
  });

  it('should return empty array when no comments exist', async () => {
    const productId = UuidMother.random();
    const storeId = UuidMother.random();

    repository.whenFindByProductAndStoreReturn([]);

    const result = await finder.run({ productId, storeId });

    expect(result.comments).toHaveLength(0);
  });
});
