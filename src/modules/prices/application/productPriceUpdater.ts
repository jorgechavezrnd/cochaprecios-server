import { ProductPriceRepository } from '../domain/productPriceRepository';
import { PriceId } from '../domain/priceId';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';
import { PriceAmount } from '../domain/priceAmount';
import { PriceCurrency } from '../domain/priceCurrency';
import { PriceCollectedAt } from '../domain/priceCollectedAt';
import { PriceSource } from '../domain/priceSource';

export interface UpdatePriceRequest {
  id: string;
  productId: string;
  storeId: string;
  price: number;
  currency: string;
  collectedAt: string;
  source: string;
}

export default class ProductPriceUpdater {
  constructor(private readonly repository: ProductPriceRepository) {}

  async run(request: UpdatePriceRequest): Promise<void> {
    const existing = await this.repository.findById(new PriceId(request.id));
    if (!existing) throw new Error(`Price with id ${request.id} does not exist`);

    existing.productId = new ProductId(request.productId);
    existing.storeId = new StoreId(request.storeId);
    existing.price = new PriceAmount(Number(request.price));
    existing.currency = new PriceCurrency(request.currency);
    existing.collectedAt = new PriceCollectedAt(new Date(request.collectedAt));
    existing.source = new PriceSource(request.source);
    existing.updatedAt = new Date();
    await this.repository.save(existing);
  }
}

