import CategoryDeleter from '../../../../src/modules/categories/application/categoryDeleter';
import { CategoryRepositoryMock } from '../__mocks__/categoryRepositoryMock';
import { CategoryMother } from '../domain/categoryMother';

describe('CategoryDeleter', () => {
  let repository: CategoryRepositoryMock;
  let deleter: CategoryDeleter;

  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    deleter = new CategoryDeleter(repository);
  });

  it('should delete a category by id', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
      await deleter.run(category.id.value);
      repository.assertLastDeletedCategoryIdIs(category.id);
  });

});
