import { ProductRepository } from '../domain/productRepository';
import { CreateProductRequest } from './createProductRequest';
import { Product } from '../domain/product';
import { ProductId } from '../domain/productId';
import { ProductName } from '../domain/productName';
import { ProductDescription } from '../domain/productDescription';
import { CategoryId } from '../../shared/domain/categories/categoryId';
import { ProductImageUrl } from '../domain/productImageUrl';
import { ProductUpdatedAt } from '../domain/productUpdatedAt';

export default class ProductCreator {
  constructor(private readonly repository: ProductRepository) { }

  async run(request: CreateProductRequest): Promise<void> {
    const existing = await this.repository.findById(new ProductId(request.id));
    const product = new Product(
      new ProductId(request.id),
      new ProductName(request.name),
      new ProductDescription(request.description),
      new CategoryId(request.categoryId),
      request.imageUrl ? new ProductImageUrl(request.imageUrl) : undefined,
      existing?.createdAt,
      new ProductUpdatedAt(new Date())
    );

    await this.repository.save(product);
  }
}
