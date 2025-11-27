import { Request, Response, NextFunction } from 'express';
import StoreSearcher from '../../modules/stores/application/storeSearcher';
import { Controller } from '../shared/controller';

export default class StoreSearchController implements Controller {
  constructor(private readonly searcher: StoreSearcher) {}

  async run(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.query as any;
      const stores = await this.searcher.run({ name });
      res.json(stores.map(s => s.toPrimitives()));
    } catch (error) {
      next(error);
    }
  }
}

