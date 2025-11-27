import { CategoryRepository } from '../domain/categoryRepository';
import { CategoryId } from '../../shared/domain/categories/categoryId';

export default class CategoryDeleter {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async run(id: string): Promise<void> {
    await this.repository.delete(new CategoryId(id));
  }
}
