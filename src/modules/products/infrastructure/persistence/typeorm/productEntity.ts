import { EntitySchema } from 'typeorm';
import { Product } from '../../../domain/product';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { ProductId } from '../../../domain/productId';
import { ProductName } from '../../../domain/productName';
import { ProductDescription } from '../../../domain/productDescription';
import { ProductCategoryId } from '../../../domain/productCategoryId';
import { ProductImageUrl } from '../../../domain/productImageUrl';

export const ProductEntity = new EntitySchema<Product>({
  name: 'Product',
  tableName: 'products',
  target: Product,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(ProductId) },
    name: { type: String, transformer: ValueObjectTransformer(ProductName) },
    description: { type: String, transformer: ValueObjectTransformer(ProductDescription) },
    categoryId: { type: String, name: 'category_id', transformer: ValueObjectTransformer(ProductCategoryId) },
    imageUrl: { type: String, nullable: true, name: 'image_url', transformer: ValueObjectTransformer(ProductImageUrl) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at' },
    updatedAt: { type: 'timestamp', updateDate: true, name: 'updated_at' },
  }
});
