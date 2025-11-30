import { Request, Response, NextFunction } from 'express';
import ProductPriceSearcher from '../../modules/prices/application/productPriceSearcher';
import { Controller } from '../shared/controller';

export default class PriceSearchController implements Controller {
  constructor(private readonly searcher: ProductPriceSearcher) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, storeId, from, to } = req.query as any;
      const prices = await this.searcher.run({ productId, storeId, from, to });
      res.json(prices.map(p => p.toPrimitives()));
    } catch (error) {
      next(error);
    }
  }
}

