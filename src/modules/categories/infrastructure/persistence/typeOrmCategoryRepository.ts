import { EntitySchema } from 'typeorm';
import { Category } from '../../domain/category';
import { CategoryId } from '../../domain/categoryId';
import { CategoryName } from '../../domain/categoryName';
import { CategoryRepository } from '../../domain/categoryRepository';
import { Nullable } from '../../../shared/domain/nullable';
import { TypeOrmRepository } from '../../../shared/infrastructure/persistence/typeorm/typeOrmRepository';
import { CategoryEntity } from './typeorm/categoryEntity';

export default class TypeOrmCategoryRepository extends TypeOrmRepository<Category> implements CategoryRepository {
  public async save(category: Category): Promise<void> {
    return this.persist(category);
  }

  public async findById(id: CategoryId): Promise<Nullable<Category>> {
    const repository = await this.repository();
    return repository.findOne({ where: { id } });
  }

  public async findByName(name: CategoryName): Promise<Nullable<Category>> {
    const repository = await this.repository();
    return repository.findOne({ where: { name } });
  }

  public async findAll(): Promise<Category[]> {
    const repository = await this.repository();
    return repository.find();
  }

  public async delete(id: CategoryId): Promise<void> {
    const repository = await this.repository();
    await repository.delete({ id });
  }

  protected entitySchema(): EntitySchema<Category> {
    return CategoryEntity;
  }
}
