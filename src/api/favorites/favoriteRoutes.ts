import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireViewer } from '../shared/auth';
import { validateReqSchema } from '../shared/validator';
import FavoritePutController from './favoritePutController';
import FavoriteDeleteController from './favoriteDeleteController';
import FavoriteGetController from './favoriteGetController';

export class FavoriteRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<FavoritePutController>('Controllers.favorites.FavoritePutController');
    const deleteController = container.get<FavoriteDeleteController>('Controllers.favorites.FavoriteDeleteController');
    const getController = container.get<FavoriteGetController>('Controllers.favorites.FavoriteGetController');

    router.get('/', authenticate, requireViewer, (req: Request, res: Response, next: NextFunction) => {
      getController.run(req, res, next);
    });

    router.put('/:id', authenticate, requireViewer, putController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      putController.run(req, res, next);
    });

    router.delete('/:id', authenticate, requireViewer, deleteController.reqSchema, validateReqSchema, (req: Request, res: Response, next: NextFunction) => {
      deleteController.run(req, res, next);
    });

    return router;
  }
}
