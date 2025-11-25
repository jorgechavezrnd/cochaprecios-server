import { CategoryRepository } from '../domain/categoryRepository';
import { CategoryId } from '../domain/categoryId';
import { CategoryName } from '../domain/categoryName';
import { CategoryDescription } from '../domain/categoryDescription';

export interface UpdateCategoryRequest {
  id: string;
  name: string;
  description: string;
}

export default class CategoryUpdater {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async run(request: UpdateCategoryRequest): Promise<void> {
    const category = await this.repository.findById(new CategoryId(request.id));
    if (!category) {
      throw new Error(`Category with id ${request.id} does not exist`);
    }

    const existingByName = await this.repository.findByName(new CategoryName(request.name));
    if (existingByName && existingByName.id.value !== request.id) {
      throw new Error(`Category with name ${request.name} already exists`);
    }

    category.name = new CategoryName(request.name);
    category.description = new CategoryDescription(request.description);
    category.updatedAt = new Date();

    await this.repository.save(category);
  }
}
