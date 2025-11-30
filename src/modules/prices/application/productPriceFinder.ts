import { ProductPriceRepository } from '../domain/productPriceRepository';
import { PriceId } from '../domain/priceId';

export default class ProductPriceFinder {
  constructor(private readonly repository: ProductPriceRepository) {}

  async run(id: string) {
    return this.repository.findById(new PriceId(id));
  }
}

