import CategoryUpdater from '../../../../src/modules/categories/application/categoryUpdater';
import { CategoryRepositoryMock } from '../__mocks__/categoryRepositoryMock';
import { CategoryMother } from '../domain/categoryMother';
import { CategoryNameMother } from '../domain/categoryNameMother';
import { CategoryDescriptionMother } from '../domain/categoryDescriptionMother';
import { CategoryNameLengthExceeded } from '../../../../src/modules/categories/domain/categoryNameLengthExceeded';
import { CategoryNameTooShort } from '../../../../src/modules/categories/domain/categoryNameTooShort';
import { CategoryDescriptionTooLong } from '../../../../src/modules/categories/domain/categoryDescriptionTooLong';
import { CategoryDescriptionTooShort } from '../../../../src/modules/categories/domain/categoryDescriptionTooShort';
import { UuidMother } from '../../shared/domain/uuidMother';

let repository: CategoryRepositoryMock;
let updater: CategoryUpdater;

beforeEach(() => {
  repository = new CategoryRepositoryMock();
  updater = new CategoryUpdater(repository);
});

describe('CategoryUpdater', () => {
  it('should update a valid category', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    repository.whenFindByNameReturn(null);

    const newName = CategoryNameMother.create('Updated Name');
    const newDescription = CategoryDescriptionMother.create('Updated Description');

    await updater.run({
      id: category.id.value,
      name: newName.value,
      description: newDescription.value,
    });

    const expected = CategoryMother.create(
      category.id,
      newName,
      newDescription
    );
    repository.assertLastSavedCategoryIs(expected);
  });

  it('should throw if category does not exist', async () => {
    repository.whenFindByIdReturn(null);
    const nonExistentId = UuidMother.random();
    await expect(
      updater.run({
        id: nonExistentId,
        name: CategoryNameMother.random().value,
        description: CategoryDescriptionMother.random().value,
      })
    ).rejects.toThrow(`Category with id ${nonExistentId} does not exist`);
  });

  it('should throw if name already exists for another category', async () => {
    const cat1 = CategoryMother.random();
    const cat2 = CategoryMother.random();
    repository.whenFindByIdReturn(cat1);
    repository.whenFindByNameReturn(cat2);

    await expect(
      updater.run({
        id: cat1.id.value,
        name: cat2.name.value,
        description: cat1.description.value,
      })
    ).rejects.toThrow(`Category with name ${cat2.name.value} already exists`);
  });

  it('should throw if name is too long', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    repository.whenFindByNameReturn(null);
    const longName = CategoryNameMother.invalidName();
    await expect(
      updater.run({
        id: category.id.value,
        name: longName,
        description: category.description.value,
      })
    ).rejects.toThrow(CategoryNameLengthExceeded);
  });

  it('should throw if name is too short', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    repository.whenFindByNameReturn(null);
    await expect(
      updater.run({
        id: category.id.value,
        name: 'a',
        description: category.description.value,
      })
    ).rejects.toThrow(CategoryNameTooShort);
  });

  it('should throw if description is too long', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    repository.whenFindByNameReturn(null);
    const longDesc = CategoryDescriptionMother.invalidTooLong();
    await expect(
      updater.run({
        id: category.id.value,
        name: category.name.value,
        description: longDesc,
      })
    ).rejects.toThrow(CategoryDescriptionTooLong);
  });

  it('should throw if description is too short', async () => {
    const category = CategoryMother.random();
    repository.whenFindByIdReturn(category);
    repository.whenFindByNameReturn(null);
    const shortDesc = CategoryDescriptionMother.invalidTooShort();
    await expect(
      updater.run({
        id: category.id.value,
        name: category.name.value,
        description: shortDesc,
      })
    ).rejects.toThrow(CategoryDescriptionTooShort);
  });
});
