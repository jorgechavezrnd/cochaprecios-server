import CommentDeleter from '../../../../src/modules/comments/application/commentDeleter';
import { CommentRepositoryMock } from '../__mocks__/commentRepositoryMock';
import { CommentMother } from '../domain/commentMother';
import { CommentIdMother } from '../domain/commentIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('CommentDeleter', () => {
  let repository: CommentRepositoryMock;
  let deleter: CommentDeleter;

  beforeEach(() => {
    repository = new CommentRepositoryMock();
    deleter = new CommentDeleter(repository);
  });

  it('should delete an existing comment', async () => {
    const comment = CommentMother.random();
    repository.whenFindByIdReturn(comment);

    await deleter.run({ id: comment.id.value, userId: comment.userId.value });

    repository.assertLastDeletedCommentIdIs(comment.id);
  });

  it('should throw if comment does not exist', async () => {
    const id = CommentIdMother.random();
    repository.whenFindByIdReturn(null);

    await expect(deleter.run({ id: id.value, userId: UuidMother.random() }))
      .rejects.toThrow(`Comment with id ${id.value} does not exist`);
  });

  it('should throw if user is not the owner', async () => {
    const comment = CommentMother.random();
    const differentUserId = UuidMother.random();
    repository.whenFindByIdReturn(comment);

    await expect(deleter.run({ id: comment.id.value, userId: differentUserId }))
      .rejects.toThrow('Forbidden: cannot delete others comment');
  });
});
