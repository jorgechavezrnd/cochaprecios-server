import { ProductPriceRepository } from '../domain/productPriceRepository';
import { ProductId } from '../../products/domain/productId';

export default class ProductPriceAggregator {
  constructor(private readonly repository: ProductPriceRepository) {}

  async run(params: { productId: string; metric: 'min' | 'max' | 'avg'; from?: string; to?: string }) {
    const productId = new ProductId(params.productId);
    const from = params.from ? new Date(params.from) : undefined;
    const to = params.to ? new Date(params.to) : undefined;
    const list = await this.repository.search({ productId, from, to });
    if (!list.length) return { value: null, count: 0 };
    const values = list.map(p => p.price.value);
    if (params.metric === 'min') return { value: Math.min(...values), count: values.length };
    if (params.metric === 'max') return { value: Math.max(...values), count: values.length };
    const sum = values.reduce((a, b) => a + b, 0);
    return { value: +(sum / values.length).toFixed(2), count: values.length };
  }
}

