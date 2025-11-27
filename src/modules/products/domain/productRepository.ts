import { Nullable } from '../../shared/domain/nullable';
import { Product } from './product';
import { ProductId } from './productId';
import { ProductName } from './productName';
import { CategoryId } from '../../shared/domain/categories/categoryId';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Nullable<Product>>;
  findByName(name: ProductName): Promise<Nullable<Product>>;
  findByCategoryId(categoryId: CategoryId): Promise<Product[]>;
  findAll(): Promise<Product[]>;
}
