import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { Store } from '../../../domain/store';
import { StoreId } from '../../../domain/storeId';
import { StoreName } from '../../../domain/storeName';
import { StoreAddress } from '../../../domain/storeAddress';
import { StorePhone } from '../../../domain/storePhone';
import { StoreCreatedAt } from '../../../domain/storeCreatedAt';
import { StoreUpdatedAt } from '../../../domain/storeUpdatedAt';

export const StoreEntity = new EntitySchema<Store>({
  name: 'Store',
  tableName: 'stores',
  target: Store,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(StoreId) },
    name: { type: String, transformer: ValueObjectTransformer(StoreName) },
    address: { type: String, transformer: ValueObjectTransformer(StoreAddress) },
    phone: { type: String, transformer: ValueObjectTransformer(StorePhone) },
    createdAt: { type: 'timestamp', createDate: true, name: 'created_at', transformer: ValueObjectTransformer(StoreCreatedAt) },
    updatedAt: { type: 'timestamp', updateDate: true, name: 'updated_at', transformer: ValueObjectTransformer(StoreUpdatedAt) },
  },
});
