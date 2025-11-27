import { Nullable } from '../../shared/domain/nullable';
import { Product } from './product';
import { ProductId } from './productId';
import { ProductName } from './productName';
import { ProductCategoryId } from './productCategoryId';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: ProductId): Promise<Nullable<Product>>;
  findByName(name: ProductName): Promise<Nullable<Product>>;
  findByCategoryId(categoryId: ProductCategoryId): Promise<Product[]>;
  findAll(): Promise<Product[]>;
}

