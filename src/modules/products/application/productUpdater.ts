import { ProductRepository } from '../domain/productRepository';
import { ProductId } from '../domain/productId';
import { ProductName } from '../domain/productName';
import { ProductDescription } from '../domain/productDescription';
import { ProductCategoryId } from '../domain/productCategoryId';
import { ProductImageUrl } from '../domain/productImageUrl';

export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrl?: string;
}

export default class ProductUpdater {
  constructor(private readonly repository: ProductRepository) {}

  async run(request: UpdateProductRequest): Promise<void> {
    const product = await this.repository.findById(new ProductId(request.id));
    if (!product) {
      throw new Error(`Product with id ${request.id} does not exist`);
    }

    const existingByName = await this.repository.findByName(new ProductName(request.name));
    if (existingByName && existingByName.id.value !== request.id) {
      throw new Error(`Product with name ${request.name} already exists`);
    }

    product.name = new ProductName(request.name);
    product.description = new ProductDescription(request.description);
    product.categoryId = new ProductCategoryId(request.categoryId);
    product.imageUrl = request.imageUrl ? new ProductImageUrl(request.imageUrl) : undefined;
    product.updatedAt = new Date();

    await this.repository.save(product);
  }
}

