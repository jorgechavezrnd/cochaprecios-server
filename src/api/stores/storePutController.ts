import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import StoreFinder from '../../modules/stores/application/storeFinder';
import StoreCreator from '../../modules/stores/application/storeCreator';
import StoreUpdater from '../../modules/stores/application/storeUpdater';
import { Controller } from '../shared/controller';
import { body, param } from 'express-validator';

export default class StorePutController implements Controller {
  private readonly creator: StoreCreator;
  private readonly updater: StoreUpdater;
  private readonly finder: StoreFinder;

  constructor(creator: StoreCreator, updater: StoreUpdater, finder: StoreFinder) {
    this.creator = creator;
    this.updater = updater;
    this.finder = finder;
  }

  get reqSchema() {
    return [
      param('id').isUUID(4),
      body('name').isString(),
      body('address').isString(),
      body('phone').isString(),
    ];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, address, phone } = req.body;
      const existing = await this.finder.run(id);
      if (existing) {
        await this.updater.run({ id, name, address, phone });
        res.status(httpStatus.OK).send();
      } else {
        await this.creator.run({ id, name, address, phone });
        res.status(httpStatus.CREATED).send();
      }
    } catch (error) {
      next(error);
    }
  }
}

