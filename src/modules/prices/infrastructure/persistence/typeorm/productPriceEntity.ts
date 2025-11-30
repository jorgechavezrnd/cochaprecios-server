import { EntitySchema } from 'typeorm';
import { ValueObjectTransformer } from '../../../../shared/infrastructure/persistence/typeorm/valueObjectTransformer';
import { ProductPrice } from '../../../domain/productPrice';
import { PriceId } from '../../../domain/priceId';
import { ProductId } from '../../../../products/domain/productId';
import { StoreId } from '../../../../stores/domain/storeId';
import { PriceAmount } from '../../../domain/priceAmount';
import { PriceCurrency } from '../../../domain/priceCurrency';
import { PriceCollectedAt } from '../../../domain/priceCollectedAt';
import { PriceSource } from '../../../domain/priceSource';

export const ProductPriceEntity = new EntitySchema<ProductPrice>({
  name: 'ProductPrice',
  tableName: 'prices',
  target: ProductPrice,
  columns: {
    id: { type: String, primary: true, transformer: ValueObjectTransformer(PriceId) },
    productId: { type: String, name: 'product_id', transformer: ValueObjectTransformer(ProductId) },
    storeId: { type: String, name: 'store_id', transformer: ValueObjectTransformer(StoreId) },
    price: { type: 'float', transformer: ValueObjectTransformer(PriceAmount) },
    currency: { type: String, transformer: ValueObjectTransformer(PriceCurrency) },
    collectedAt: { type: Date, name: 'collected_at', transformer: ValueObjectTransformer(PriceCollectedAt) },
    source: { type: String, transformer: ValueObjectTransformer(PriceSource) },
    createdAt: { type: Date, name: 'created_at', createDate: true },
    updatedAt: { type: Date, name: 'updated_at', updateDate: true },
  },
});
