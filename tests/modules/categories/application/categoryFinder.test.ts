import CategoryFinder from '../../../../src/modules/categories/application/categoryFinder';
import { CategoryRepositoryMock } from '../__mocks__/categoryRepositoryMock';
import { CategoryMother } from '../domain/categoryMother';
import { CategoryIdMother } from '../../shared/domain/categoryIdMother';
import { CategoryNameMother } from '../domain/categoryNameMother';

describe('CategoryFinder', () => {
  let repository: CategoryRepositoryMock;
  let finder: CategoryFinder;

  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    finder = new CategoryFinder(repository);
  });

  it('should find a category by id', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    const found = await finder.findById(category.id.value);
    expect(found).not.toBeNull();
    expect(found!.id.value).toBe(category.id.value);
  });

  it('should return null if category does not exist', async () => {
    repository.whenFindByIdReturn(null);
    const found = await finder.findById(CategoryIdMother.random().value);
    expect(found).toBeNull();
  });

  it('should find a category by name', async () => {
    const category = CategoryMother.random();
    repository.whenFindByNameReturn(category);
    const found = await finder.findByName(category.name.value);
    expect(found).not.toBeNull();
    expect(found!.name.value).toBe(category.name.value);
  });

  it('should return null if category by name does not exist', async () => {
    repository.whenFindByNameReturn(null);
    const found = await finder.findByName(CategoryNameMother.random().value);
    expect(found).toBeNull();
  });
});
