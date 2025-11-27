import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import StoreDeleter from '../../modules/stores/application/storeDeleter';
import { Controller } from '../shared/controller';
import { param } from 'express-validator';

export default class StoreDeleteController implements Controller {
  constructor(private readonly deleter: StoreDeleter) {}

  get reqSchema() {
    return [param('id').isUUID(4)];
  }

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleter.run(id);
      res.status(httpStatus.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  }
}

