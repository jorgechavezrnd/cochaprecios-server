import { Nullable } from '../../shared/domain/nullable';
import { ProductPrice } from './productPrice';
import { PriceId } from './priceId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export interface ProductPriceRepository {
  save(price: ProductPrice): Promise<void>;
  findById(id: PriceId): Promise<Nullable<ProductPrice>>;
  findByProductId(productId: ProductId): Promise<ProductPrice[]>;
  findByStoreId(storeId: StoreId): Promise<ProductPrice[]>;
  search(params: { productId?: ProductId; storeId?: StoreId; from?: Date; to?: Date }): Promise<ProductPrice[]>;
}

