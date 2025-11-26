import { EntitySchema } from 'typeorm';

import { Category } from '../../../domain/category';
import { CategoryId } from '../../../domain/categoryId';
import { CategoryName } from '../../../domain/categoryName';
import { CategoryDescription } from '../../../domain/categoryDescription';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';

export const CategoryEntity = new EntitySchema<Category>({
  name: 'Category',
  tableName: 'categories',
  target: Category,
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(CategoryId),
    },
    name: {
      type: String,
      unique: true,
      transformer: ValueObjectTransformer(CategoryName),
    },
    description: {
      type: String,
      transformer: ValueObjectTransformer(CategoryDescription),
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
      name: 'created_at',
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
      name: 'updated_at',
    },
  },
});
