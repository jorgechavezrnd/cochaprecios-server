import { CategoryRepository } from '../domain/categoryRepository';
import { CategoryId } from '../../shared/domain/categories/categoryId';
import { CategoryName } from '../domain/categoryName';
import { Nullable } from '../../shared/domain/nullable';
import { Category } from '../domain/category';

export default class CategoryFinder {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async findById(id: string): Promise<Nullable<Category>> {
    return this.repository.findById(new CategoryId(id));
  }

  async findByName(name: string): Promise<Nullable<Category>> {
    return this.repository.findByName(new CategoryName(name));
  }
}
