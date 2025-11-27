import { CategoryRepository } from '../../../../src/modules/categories/domain/categoryRepository';
import { Category } from '../../../../src/modules/categories/domain/category';
import { CategoryId } from '../../../../src/modules/shared/domain/categories/categoryId';
import { CategoryName } from '../../../../src/modules/categories/domain/categoryName';
import { Nullable } from '../../../../src/modules/shared/domain/nullable';

export class CategoryRepositoryMock implements CategoryRepository {
  private readonly mockSave = jest.fn();
  private readonly mockFindById = jest.fn();
  private readonly mockFindByName = jest.fn();
  private readonly mockDelete = jest.fn();
  private readonly mockFindAll = jest.fn();

  async save(category: Category): Promise<void> {
    await this.mockSave(category);
  }

  async findById(id: CategoryId): Promise<Nullable<Category>> {
    return await this.mockFindById(id);
  }

  async findByName(name: CategoryName): Promise<Nullable<Category>> {
    return await this.mockFindByName(name);
  }

  async findAll(): Promise<Category[]> {
    return await this.mockFindAll();
  }
  whenFindAllReturn(categories: Category[]): void {
    this.mockFindAll.mockResolvedValue(categories);
  }

  async delete(id: CategoryId): Promise<void> {
    await this.mockDelete(id);
  }
  assertLastDeletedCategoryIdIs(expectedId: CategoryId): void {
    const mock = this.mockDelete.mock;
    const lastDeletedId = (mock.calls[mock.calls.length - 1] as CategoryId[])[0];
    expect(lastDeletedId).toEqual(expectedId);
  }

  assertLastSavedCategoryIs(expected: Category): void {
    const mock = this.mockSave.mock;
    const lastSaved = (mock.calls[mock.calls.length - 1] as Category[])[0];
    expect(lastSaved).toBeInstanceOf(Category);
    expect(lastSaved.id).toEqual(expected.id);
    expect(lastSaved.name.value).toEqual(expected.name.value);
    expect(lastSaved.description.value).toEqual(expected.description.value);
  }

  whenFindByIdReturn(category: Nullable<Category>): void {
    this.mockFindById.mockReturnValue(category);
  }

  whenFindByNameReturn(category: Nullable<Category>): void {
    this.mockFindByName.mockReturnValue(category);
  }
}
