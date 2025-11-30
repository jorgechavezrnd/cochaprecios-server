import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ProductPriceCreator from '../../modules/prices/application/productPriceCreator';
import ProductPriceUpdater from '../../modules/prices/application/productPriceUpdater';
import ProductPriceFinder from '../../modules/prices/application/productPriceFinder';
import { Controller } from '../shared/controller';
import { body, param } from 'express-validator';

export default class PricePutController implements Controller {
  private readonly creator: ProductPriceCreator;
  private readonly updater: ProductPriceUpdater;
  private readonly finder: ProductPriceFinder;

  constructor(creator: ProductPriceCreator, updater: ProductPriceUpdater, finder: ProductPriceFinder) {
    this.creator = creator;
    this.updater = updater;
    this.finder = finder;
  }

  get reqSchema() {
    return [
      param('id').isUUID(4),
      body('productId').isUUID(4),
      body('storeId').isUUID(4),
      body('price').isNumeric(),
      body('currency').isString(),
      body('collectedAt').isISO8601(),
      body('source').isString(),
    ];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { productId, storeId, price, currency, collectedAt, source } = req.body;
      const existing = await this.finder.run(id);
      if (existing) {
        await this.updater.run({ id, productId, storeId, price, currency, collectedAt, source });
        res.status(httpStatus.OK).send();
      } else {
        await this.creator.run({ id, productId, storeId, price, currency, collectedAt, source });
        res.status(httpStatus.CREATED).send();
      }
    } catch (error) {
      next(error);
    }
  }
}

