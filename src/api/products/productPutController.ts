import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from '../shared/controller';
import { body, ValidationChain, param } from 'express-validator';
import ProductCreator from '../../modules/products/application/productCreator';
import ProductUpdater from '../../modules/products/application/productUpdater';
import ProductFinder from '../../modules/products/application/productFinder';

export default class ProductPutController implements Controller {
  private readonly creator: ProductCreator;
  private readonly updater: ProductUpdater;
  private readonly finder: ProductFinder;

  constructor(creator: ProductCreator, updater: ProductUpdater, finder: ProductFinder) {
    this.creator = creator;
    this.updater = updater;
    this.finder = finder;
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, description, categoryId, imageUrl } = req.body;
      const existing = await this.finder.run(id);
      if (existing) {
        await this.updater.run({ id, name, description, categoryId, imageUrl });
        res.status(httpStatus.OK).send();
      } else {
        await this.creator.run({ id, name, description, categoryId, imageUrl });
        res.status(httpStatus.CREATED).send();
      }
    } catch (error) {
      next(error);
    }
  }

  get reqSchema(): ValidationChain[] {
    return [
      param('id').isUUID(4),
      body('name').isString().trim().isLength({ min: 3, max: 60 }),
      body('description').isString().trim().isLength({ min: 3, max: 255 }),
      body('categoryId').isUUID(4),
      body('imageUrl').optional().isString().isLength({ max: 255 })
    ];
  }
}
