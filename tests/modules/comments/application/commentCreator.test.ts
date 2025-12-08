import CommentCreator from '../../../../src/modules/comments/application/commentCreator';
import { CommentRepositoryMock } from '../__mocks__/commentRepositoryMock';
import { CommentMother } from '../domain/commentMother';
import { CommentIdMother } from '../domain/commentIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('CommentCreator', () => {
  let repository: CommentRepositoryMock;
  let creator: CommentCreator;

  beforeEach(() => {
    repository = new CommentRepositoryMock();
    creator = new CommentCreator(repository);
  });

  it('should create a valid comment', async () => {
    const id = CommentIdMother.random();
    const productId = UuidMother.random();
    const storeId = UuidMother.random();
    const userId = UuidMother.random();
    const content = 'This is a test comment';

    await creator.run({ id: id.value, productId, storeId, userId, content });

    const expected = CommentMother.create(
      id,
      { value: productId } as any,
      { value: storeId } as any,
      { value: userId } as any,
      { value: content } as any
    );
    repository.assertLastSavedCommentIs(expected);
  });
});
