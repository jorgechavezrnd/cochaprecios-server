import { ProductPriceRepository } from '../domain/productPriceRepository';
import { CreatePriceRequest } from './createPriceRequest';
import { ProductPrice } from '../domain/productPrice';
import { PriceId } from '../domain/priceId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { PriceAmount } from '../domain/priceAmount';
import { PriceCurrency } from '../domain/priceCurrency';
import { PriceCollectedAt } from '../domain/priceCollectedAt';
import { PriceSource } from '../domain/priceSource';

export default class ProductPriceCreator {
  constructor(private readonly repository: ProductPriceRepository) {}

  async run(request: CreatePriceRequest): Promise<void> {
    const price = new ProductPrice(
      new PriceId(request.id),
      new ProductId(request.productId),
      new StoreId(request.storeId),
      new PriceAmount(Number(request.price)),
      new PriceCurrency(request.currency),
      new PriceCollectedAt(new Date(request.collectedAt)),
      new PriceSource(request.source)
    );
    await this.repository.save(price);
  }
}

