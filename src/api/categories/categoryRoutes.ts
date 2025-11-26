import { Router, Request, Response, NextFunction } from 'express';

import CategoryPutController from './categoryPutController';
import CategoryGetController from './categoryGetController';
import CategoryGetAllController from './categoryGetAllController';
import CategoryDeleteController from './categoryDeleteController';
import { validateReqSchema } from '../shared/validator';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireAdmin } from '../shared/auth';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const categoryPutController = container.get<CategoryPutController>('Controllers.categories.CategoryPutController');
    const categoryGetController = container.get<CategoryGetController>('Controllers.categories.CategoryGetController');
    const categoryGetAllController = container.get<CategoryGetAllController>('Controllers.categories.CategoryGetAllController');
    const categoryDeleteController = container.get<CategoryDeleteController>('Controllers.categories.CategoryDeleteController');

    router.put('/:id', authenticate, requireAdmin, categoryPutController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      categoryPutController.run(req, res, next);
    });

    router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
      categoryGetController.run(req, res, next);
    });

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
      categoryGetAllController.run(req, res, next);
    });

    router.delete('/:id', authenticate, requireAdmin, (req: Request, res: Response, next: NextFunction) => {
      categoryDeleteController.run(req, res, next);
    });

    return router;
  }
}
