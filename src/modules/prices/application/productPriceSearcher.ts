import { ProductPriceRepository } from '../domain/productPriceRepository';
import { ProductId } from '../../products/domain/productId';
import { StoreId } from '../../stores/domain/storeId';

export default class ProductPriceSearcher {
  constructor(private readonly repository: ProductPriceRepository) {}

  async run(params: { productId?: string; storeId?: string; from?: string; to?: string }) {
    const pId = params.productId ? new ProductId(params.productId) : undefined;
    const sId = params.storeId ? new StoreId(params.storeId) : undefined;
    const from = params.from ? new Date(params.from) : undefined;
    const to = params.to ? new Date(params.to) : undefined;
    return this.repository.search({ productId: pId, storeId: sId, from, to });
  }
}

