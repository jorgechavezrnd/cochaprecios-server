import { Request, Response, NextFunction } from 'express';
import StoreFinder from '../../modules/stores/application/storeFinder';
import { Controller } from '../shared/controller';

export default class StoreGetController implements Controller {
  constructor(private readonly finder: StoreFinder) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const store = await this.finder.run(id);
      if (!store) {
        res.status(404).json({ status: 'error', message: 'Store not found' });
        return;
      }
      res.json(store.toPrimitives());
    } catch (error) {
      next(error);
    }
  }
}

