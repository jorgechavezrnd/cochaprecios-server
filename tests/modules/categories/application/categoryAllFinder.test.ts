import CategoryAllFinder from '../../../../src/modules/categories/application/categoryAllFinder';
import { CategoryRepositoryMock } from '../__mocks__/categoryRepositoryMock';
import { CategoryMother } from '../domain/categoryMother';

describe('CategoryAllFinder', () => {
  let repository: CategoryRepositoryMock;
  let allFinder: CategoryAllFinder;

  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    allFinder = new CategoryAllFinder(repository);
  });

  it('should return all categories', async () => {
    const categories = [CategoryMother.random(), CategoryMother.random()];
    repository.whenFindAllReturn(categories);
    const found = await allFinder.findAll();
    expect(found).toHaveLength(2);
    expect(found[0].id.value).toBe(categories[0].id.value);
    expect(found[1].id.value).toBe(categories[1].id.value);
  });

  it('should return empty array if no categories', async () => {
    repository.whenFindAllReturn([]);
    const found = await allFinder.findAll();
    expect(found).toEqual([]);
  });
});
