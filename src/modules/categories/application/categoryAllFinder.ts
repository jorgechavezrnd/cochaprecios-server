import { CategoryRepository } from '../domain/categoryRepository';
import { Category } from '../domain/category';

export default class CategoryAllFinder {
  private readonly repository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return this.repository.findAll();
  }
}
