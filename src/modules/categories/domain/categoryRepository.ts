import { Category } from './category';
import { CategoryId } from '../../shared/domain/categories/categoryId';
import { CategoryName } from './categoryName';
import { Nullable } from '../../shared/domain/nullable';

export interface CategoryRepository {
  save(category: Category): Promise<void>;
  findById(id: CategoryId): Promise<Nullable<Category>>;
  findByName(name: CategoryName): Promise<Nullable<Category>>;
  findAll(): Promise<Category[]>;
  delete(id: CategoryId): Promise<void>;
}
