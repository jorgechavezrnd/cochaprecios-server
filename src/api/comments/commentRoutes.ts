import { Router, Request, Response, NextFunction } from 'express';
import { getContainer } from '../shared/dependency-injection/container';
import { authenticate, requireViewer } from '../shared/auth';
import { validateReqSchema } from '../shared/validator';
import CommentPutController from './commentPutController';
import CommentDeleteController from './commentDeleteController';
import CommentGetController from './commentGetController';

export class CommentRoutes {
  static get routes(): Router {
    const router = Router();
    const container = getContainer();
    const putController = container.get<CommentPutController>('Controllers.comments.CommentPutController');
    const deleteController = container.get<CommentDeleteController>('Controllers.comments.CommentDeleteController');
    const getController = container.get<CommentGetController>('Controllers.comments.CommentGetController');

    router.get('/', (req: Request, res: Response, next: NextFunction) => {
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
