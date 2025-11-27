import { Nullable } from '../../shared/domain/nullable';
import { Store } from './store';
import { StoreId } from './storeId';
import { StoreName } from './storeName';

export interface StoreRepository {
  save(store: Store): Promise<void>;
  findById(id: StoreId): Promise<Nullable<Store>>;
  findByName(name: StoreName): Promise<Nullable<Store>>;
  findAll(): Promise<Store[]>;
  delete(id: StoreId): Promise<void>;
}

