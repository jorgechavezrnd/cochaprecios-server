import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { validateReqSchema } from '../shared/validator';
import { authenticate, requireAdmin } from '../shared/auth';
import ProductPutController from './productPutController';
import ProductGetController from './productGetController';
import ProductSearchController from './productSearchController';

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<ProductPutController>('Controllers.products.ProductPutController');
    const getController = container.get<ProductGetController>('Controllers.products.ProductGetController');
    const searchController = container.get<ProductSearchController>('Controllers.products.ProductSearchController');

    router.put('/:id', authenticate, requireAdmin, putController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      putController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      searchController.run(req, res, next);
    });

    return router;
  }
}

