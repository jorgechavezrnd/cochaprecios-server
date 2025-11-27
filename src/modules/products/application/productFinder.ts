import { ProductRepository } from '../domain/productRepository';
import { ProductId } from '../domain/productId';
import { Nullable } from '../../shared/domain/nullable';
import { Product } from '../domain/product';

export default class ProductFinder {
  constructor(private readonly repository: ProductRepository) {}

  async run(id: string): Promise<Nullable<Product>> {
    return this.repository.findById(new ProductId(id));
  }
}
