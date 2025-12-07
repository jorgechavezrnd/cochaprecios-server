import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireViewer } from '../shared/auth';
import { validateReqSchema } from '../shared/validator';
import LikePutController from './likePutController';
import LikeDeleteController from './likeDeleteController';
import LikeCountController from './likeCountController';

export class LikeRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<LikePutController>('Controllers.likes.LikePutController');
    const deleteController = container.get<LikeDeleteController>('Controllers.likes.LikeDeleteController');
    const countController = container.get<LikeCountController>('Controllers.likes.LikeCountController');

    router.get('/count', (req: Request, res: Response, next: NextFunction) => {
      countController.run(req, res, next);
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

