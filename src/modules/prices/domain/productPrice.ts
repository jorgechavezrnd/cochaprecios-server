import { AggregateRoot } from '../../shared/domain/aggregateRoot';
import { PriceId } from './priceId';
import { PriceAmount } from './priceAmount';
import { PriceCurrency } from './priceCurrency';
import { PriceCollectedAt } from './priceCollectedAt';
import { PriceSource } from './priceSource';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export class ProductPrice extends AggregateRoot {
  readonly id: PriceId;
  productId: ProductId;
  storeId: StoreId;
  price: PriceAmount;
  currency: PriceCurrency;
  collectedAt: PriceCollectedAt;
  source: PriceSource;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: PriceId,
    productId: ProductId,
    storeId: StoreId,
    price: PriceAmount,
    currency: PriceCurrency,
    collectedAt: PriceCollectedAt,
    source: PriceSource,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.storeId = storeId;
    this.price = price;
    this.currency = currency;
    this.collectedAt = collectedAt;
    this.source = source;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromPrimitives(plain: { id: string; productId: string; storeId: string; price: number; currency: string; collectedAt: Date; source: string; createdAt?: Date; updatedAt?: Date }): ProductPrice {
    return new ProductPrice(
      new PriceId(plain.id),
      new ProductId(plain.productId),
      new StoreId(plain.storeId),
      new PriceAmount(plain.price),
      new PriceCurrency(plain.currency),
      new PriceCollectedAt(plain.collectedAt),
      new PriceSource(plain.source),
      plain.createdAt,
      plain.updatedAt
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      productId: this.productId.value,
      storeId: this.storeId.value,
      price: this.price.value,
      currency: this.currency.value,
      collectedAt: this.collectedAt.value,
      source: this.source.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

