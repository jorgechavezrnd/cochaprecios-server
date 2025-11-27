import CategoryCreator from '../../../../src/modules/categories/application/categoryCreator';
import { CategoryRepositoryMock } from '../__mocks__/categoryRepositoryMock';
import { CategoryMother } from '../domain/categoryMother';
import { CategoryNameMother } from '../domain/categoryNameMother';
import { CategoryDescriptionMother } from '../domain/categoryDescriptionMother';
import { UuidMother } from '../../shared/domain/uuidMother';
import { CategoryIdMother } from '../../shared/domain/categoryIdMother';

describe('CategoryCreator', () => {
  let repository: CategoryRepositoryMock;
  let creator: CategoryCreator;

  beforeEach(() => {
    repository = new CategoryRepositoryMock();
    creator = new CategoryCreator(repository);
  });

  it('should create a valid category', async () => {
    const id = CategoryIdMother.random();
    const name = CategoryNameMother.random().value;
    const description = CategoryDescriptionMother.random().value;
    repository.whenFindByNameReturn(null);

    await creator.run({ id: id.value, name, description });

    const expected = CategoryMother.create(
      id,
      CategoryNameMother.create(name),
      CategoryDescriptionMother.create(description)
    );
    repository.assertLastSavedCategoryIs(expected);
  });

  it('should throw if name already exists', async () => {
    const existing = CategoryMother.random();
    repository.whenFindByNameReturn(existing);
    await expect(
      creator.run({
        id: UuidMother.random(),
        name: existing.name.value,
        description: CategoryDescriptionMother.random().value,
      })
    ).rejects.toThrow(`Category with name ${existing.name.value} already exists`);
  });
});
