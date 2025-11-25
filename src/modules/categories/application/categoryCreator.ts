import { CategoryRepository } from '../domain/categoryRepository';
import { Category } from '../domain/category';
import { CategoryId } from '../domain/categoryId';
import { CategoryName } from '../domain/categoryName';
import { CategoryDescription } from '../domain/categoryDescription';
import { CreateCategoryRequest } from './createCategoryRequest';

export default class CategoryCreator {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async run(request: CreateCategoryRequest): Promise<void> {
    const existingCategory = await this.repository.findByName(new CategoryName(request.name));
    if (existingCategory) {
      throw new Error(`Category with name ${request.name} already exists`);
    }

    const category = new Category(
      new CategoryId(request.id),
      new CategoryName(request.name),
      new CategoryDescription(request.description)
    );

    await this.repository.save(category);
  }
}
