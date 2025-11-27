import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import StorePutController from './storePutController';
import StoreGetController from './storeGetController';
import StoreSearchController from './storeSearchController';
import { authenticate, requireAdmin } from '../shared/auth';
import { validateReqSchema } from '../shared/validator';
import StoreDeleteController from './storeDeleteController';

export class StoreRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<StorePutController>('Controllers.stores.StorePutController');
    const getController = container.get<StoreGetController>('Controllers.stores.StoreGetController');
    const searchController = container.get<StoreSearchController>('Controllers.stores.StoreSearchController');
    const deleteController = container.get<StoreDeleteController>('Controllers.stores.StoreDeleteController');

    router.put('/:id', authenticate, requireAdmin, putController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      putController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      searchController.run(req, res, next);
    });

    router.delete('/:id', authenticate, requireAdmin, deleteController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      deleteController.run(req, res, next);
    });

    return router;
  }
}
