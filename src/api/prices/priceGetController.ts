import { Request, Response, NextFunction } from 'express';
import ProductPriceFinder from '../../modules/prices/application/productPriceFinder';
import { Controller } from '../shared/controller';

export default class PriceGetController implements Controller {
  constructor(private readonly finder: ProductPriceFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const price = await this.finder.run(id);
      if (!price) {
        res.status(404).json({ status: 'error', message: 'Price not found' });
        return;
      }
      res.json(price.toPrimitives());
    } catch (error) {
      next(error);
    }
  }
}

