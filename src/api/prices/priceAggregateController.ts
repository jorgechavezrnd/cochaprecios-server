import { Request, Response, NextFunction } from 'express';
import ProductPriceAggregator from '../../modules/prices/application/productPriceAggregator';
import { Controller } from '../shared/controller';

export default class PriceAggregateController implements Controller {
  constructor(private readonly aggregator: ProductPriceAggregator) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { productId, metric, from, to } = req.query as any;
      const result = await this.aggregator.run({ productId, metric, from, to });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

