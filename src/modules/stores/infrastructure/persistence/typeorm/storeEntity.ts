import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { Store } from '../../../domain/store';
import { StoreId } from '../../../domain/storeId';
import { StoreName } from '../../../domain/storeName';
import { StoreAddress } from '../../../domain/storeAddress';
import { StorePhone } from '../../../domain/storePhone';

export const StoreEntity = new EntitySchema<Store>({
  name: 'Store',
  tableName: 'stores',
  target: Store,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(StoreId) },
    name: { type: String, transformer: ValueObjectTransformer(StoreName) },
    address: { type: String, transformer: ValueObjectTransformer(StoreAddress) },
    phone: { type: String, transformer: ValueObjectTransformer(StorePhone) },
    createdAt: { type: Date, name: 'created_at', createDate: true },
    updatedAt: { type: Date, name: 'updated_at', updateDate: true },
  },
});
