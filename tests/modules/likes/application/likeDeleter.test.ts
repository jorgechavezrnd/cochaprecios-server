import LikeDeleter from '../../../../src/modules/likes/application/likeDeleter';
import { LikeRepositoryMock } from '../__mocks__/likeRepositoryMock';
import { LikeMother } from '../domain/likeMother';
import { LikeIdMother } from '../domain/likeIdMother';
import { UuidMother } from '../../shared/domain/uuidMother';

describe('LikeDeleter', () => {
  let repository: LikeRepositoryMock;
  let deleter: LikeDeleter;

  beforeEach(() => {
    repository = new LikeRepositoryMock();
    deleter = new LikeDeleter(repository);
  });

  it('should delete an existing like', async () => {
    const like = LikeMother.random();
    repository.whenFindByIdReturn(like);

    await deleter.run({ id: like.id.value, userId: like.userId.value });

    repository.assertLastDeletedLikeIdIs(like.id);
  });

  it('should throw if like does not exist', async () => {
    const id = LikeIdMother.random();
    repository.whenFindByIdReturn(null);

    await expect(deleter.run({ id: id.value, userId: UuidMother.random() }))
      .rejects.toThrow(`Like with id ${id.value} does not exist`);
  });

  it('should throw if user is not the owner', async () => {
    const like = LikeMother.random();
    const differentUserId = UuidMother.random();
    repository.whenFindByIdReturn(like);

    await expect(deleter.run({ id: like.id.value, userId: differentUserId }))
      .rejects.toThrow('Forbidden: cannot delete others like');
  });
});
