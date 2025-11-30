import { ProductPrice } from '../../../../src/modules/prices/domain/productPrice';
import { PriceId } from '../../../../src/modules/prices/domain/priceId';
import { PriceAmount } from '../../../../src/modules/prices/domain/priceAmount';
import { PriceCurrency } from '../../../../src/modules/prices/domain/priceCurrency';
import { PriceCollectedAt } from '../../../../src/modules/prices/domain/priceCollectedAt';
import { PriceSource } from '../../../../src/modules/prices/domain/priceSource';
import { ProductId } from '../../../../src/modules/products/domain/productId';
import { StoreId } from '../../../../src/modules/stores/domain/storeId';
import { UuidMother } from '../../shared/domain/uuidMother';

export class ProductPriceMother {
  static create(id: PriceId, productId: ProductId, storeId: StoreId, amount: PriceAmount, currency: PriceCurrency, collectedAt: PriceCollectedAt, source: PriceSource): ProductPrice {
    return new ProductPrice(id, productId, storeId, amount, currency, collectedAt, source);
  }

  static random(): ProductPrice {
    return this.create(
      new PriceId(UuidMother.random()),
      new ProductId(UuidMother.random()),
      new StoreId(UuidMother.random()),
      new PriceAmount(12.5),
      new PriceCurrency('BOB'),
      new PriceCollectedAt(new Date('2024-08-01T00:00:00Z')),
      new PriceSource('manual')
    );
  }
}

