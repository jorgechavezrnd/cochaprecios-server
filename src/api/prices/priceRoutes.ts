import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import PricePutController from './pricePutController';
import PriceGetController from './priceGetController';
import PriceSearchController from './priceSearchController';
import PriceAggregateController from './priceAggregateController';
import { authenticate, requireAdmin } from '../shared/auth';
import { validateReqSchema } from '../shared/validator';

export class PriceRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<PricePutController>('Controllers.prices.PricePutController');
    const getController = container.get<PriceGetController>('Controllers.prices.PriceGetController');
    const searchController = container.get<PriceSearchController>('Controllers.prices.PriceSearchController');
    const aggregateController = container.get<PriceAggregateController>('Controllers.prices.PriceAggregateController');

    router.get('/aggregate', (req: Request, res: Response, next: NextFunction) => {
      aggregateController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      searchController.run(req, res, next);
    });

    router.put('/:id', authenticate, requireAdmin, putController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      putController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
    });

    return router;
  }
}
