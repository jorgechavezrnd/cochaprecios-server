import { EntitySchema } from 'typeorm';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { Product } from '../../domain/product';
import { ProductId } from '../../domain/productId';
import { ProductName } from '../../domain/productName';
import { ProductCategoryId } from '../../domain/productCategoryId';
import { ProductRepository } from '../../domain/productRepository';
import { ProductEntity } from './typeorm/productEntity';

export default class TypeOrmProductRepository extends TypeOrmRepository<Product> implements ProductRepository {
  public async save(product: Product): Promise<void> {
    return this.persist(product);
  }

  public async findById(id: ProductId): Promise<Nullable<Product>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } });
  }

  public async findByName(name: ProductName): Promise<Nullable<Product>> {
    const repository = await this.repository();
    return repository.findOne({ where: { name } });
  }

  public async findByCategoryId(categoryId: ProductCategoryId): Promise<Product[]> {
    const repository = await this.repository();
    return repository.find({ where: { categoryId } });
  }

  public async findAll(): Promise<Product[]> {
    const repository = await this.repository();
    return repository.find();
  }

  protected entitySchema(): EntitySchema<Product> {
    return ProductEntity;
  }
}

