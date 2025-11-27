import { ProductRepository } from '../domain/productRepository';
import { Product } from '../domain/product';
import { ProductName } from '../domain/productName';
import { CategoryId } from '../../shared/domain/categories/categoryId';

export default class ProductSearcher {
  constructor(private readonly repository: ProductRepository) {}

  async run(params: { name?: string; categoryId?: string }): Promise<Product[]> {
    if (params.name) {
      const found = await this.repository.findByName(new ProductName(params.name));
      return found ? [found] : [];
    }
    if (params.categoryId) {
      return this.repository.findByCategoryId(new CategoryId(params.categoryId));
    }
    return this.repository.findAll();
  }
}
